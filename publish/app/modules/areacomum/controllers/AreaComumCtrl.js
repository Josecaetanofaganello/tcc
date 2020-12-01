(function () {
    //'use strict';

    angular
        .module('app')
        .controller('AreaComumCtrl', AreaComumCtrl);

    AreaComumCtrl.$inject = ['$scope', '$http', 'AreaComumRepository'];

    function AreaComumCtrl($scope, $http, AreaComumRepository) {
        $scope.todo = {
            id: 0,
            notificacao: '',
            descricao:'',
            motivo:'',
            dataInicial: Date.now,
            dataFinal: null,
            status: 'Reservada',
            areaId: 0,
            idUsuario: 0
        }

        $scope.todos = [];
        
        Load();
        
       

        $scope.user = function () {
            loadUser();
            return $scope.usuario.nome;
        };

        $scope.loadPanel = function (valor) {
            return getNum(valor);


        };
      
        function loadUser() {
            $scope.usuario = {
                id: localStorage.getItem('id'),
                nome: localStorage.getItem('nome'),
                email: localStorage.getItem('email'),
                tipo: localStorage.getItem('tipo')
            };
        };

        $scope.save = function (todo) {
            if (todo.id == 0) {

                var date = new Date();
                todo.status = 'Aberta';
                todo.dataInicial = format(date, 'yyyy-MM-ddThh:mm');
                
                //Insere 7 dias a data final
                date.setDate(date.getDate() + 7);
                todo.idUsuario = $scope.usuario.id
                todo.dataFinal = format(date, 'yyyy-MM-ddThh:mm');
                Save($scope.todo);
            } else {
                Edit();
            }
            New();
        }

        format = function date2str(x, y) {
            var z = {
                M: x.getMonth() + 1,
                d: x.getDate(),
                h: x.getHours(),
                m: x.getMinutes(),
                s: x.getSeconds()
            };
            y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
            });

            return y.replace(/(y+)/g, function (v) {
                return x.getFullYear().toString().slice(-v.length)
            });
        }

        $scope.new = function () {
            New();
        }

        $scope.edit = function (todo) {
            $scope.todo = todo;
        }

        $scope.delete = function (todo) {
            toastr.error("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Deseja realmente apagar?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            Delete(todo);
                            var index = $scope.todos.indexOf(todo)
                            $scope.todos.splice(index, 1);
                        });
                    }
                });

        }

        $scope.sync = function (todo) {
            Sync(todo);
            //VoteLoad();
            //location.reload();
        }

        $scope.findUser = function(todo){
            
            for (let i = 0; $scope.usuarios.length; i++){
                if($scope.usuarios[i].id == todo.idUsuario){
                    return $scope.usuarios[i].nome;
                }
            }
        
        
    };

    $scope.checkStatus = function (reserva) {
        var date = new Date();
        if (Date.parse(reserva.dataFinal) < Date.parse(date) && reserva.status != "Cancelada") {
            angular.forEach($scope.todos, function (todo) {
                if (todo.id == reserva.id) {
                    todo.status = "Expirada";
                } 
            });
            return todo.status;
        } else {
            return todo.status
        }

    }; 

    
    $scope.findArea = function(todo){
        for (let i = 0; $scope.areas.length; i++){
            if($scope.areas[i].id == todo.areaId){
                return $scope.areas[i].descricao;
            }
        }
    };

        function Save(item) {
            //item.id = $scope.todos.length + 1;
            if($scope.todos == ""){
                $scope.todos = [];
            }
            $scope.todos.push(item);
        }

        function Delete(item) {
            AreaComumRepository
                .delete(item)
                .then(
                    function (result) {

                        toastr.info(result.data, "Deletado com sucesso!")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function getNum(val) {
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }
      

        function New() {
            $scope.todo = {
                id: 0,
                notificacao: '',
                descricao:'',
                motivo:'',
                dataInicial: Date.now,
                dataFinal: null,
                status: 'Reservada',
                areaId: 0,
                idUsuario: 0

            }
        }


        function Load() {
            if (navigator.onLine) {
                ReadAreas();
                ReadUsers();
                ReadCloud();
                document.getElementById("mySidenav").style.visibility = "visible";
            } else {
                ReadLocal();
                document.getElementById("mySidenav").style.visibility = "visible";
            }
        }

        function Sync(todo) {
            if (navigator.onLine) {
                SaveCloud(todo);
            } else {
                SaveLocal();
            }
        }

        function ReadLocal() {
            $scope.todos = angular.fromJson(localStorage.getItem("todos"));
            toastr.info('Informações carregadas do disco local...', 'Tudo certo!');
        }

        function SaveLocal() {
            localStorage.setItem("todos", angular.toJson($scope.todos));
            toastr.warning('Informações persistidas localmente...', 'Sincronizando');
        }

        function ReadCloud() {
            loadUser();
            AreaComumRepository
                .getTodos($scope.usuario)
                .then(
                    function (result) {
                        for (let i = 0; i < result.data.length; i = i + 1) {
                            
                            result.data[i].dataInicial = result.data[i].dataInicial.replace(' ', 'T');

                            if (result.data[i].dataFinal != null) {
                                result.data[i].dataFinal = result.data[i].dataFinal.replace(' ', 'T');
                            }
                        }
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });

        }

        function ReadUsers(){
            AreaComumRepository
                   .getUsuarios()
                   .then(
                       function (result) {
                          
                           $scope.usuarios = result.data;
                       },
                       function (error) {
                           toastr.error(error.data, "Falha na requisição");
                       });
       }

       function ReadAreas(){
                AreaComumRepository
                       .getAreas()
                       .then(
                           function (result) {
                              
                               $scope.areas = result.data;

                           },
                           function (error) {
                               toastr.error(error.data, "Falha na requisição");
                           });
       }

        

        function SaveCloud(todo) {
            AreaComumRepository
                .sync(todo)
                .then(
                    function (result) {
                        for (let i = 0; i < $scope.todos.length; i = i + 1) {
                            $scope.todos[i].id = result.data.id;
                            $scope.todos[i].status = result.data.status;
                            $scope.todos[i].dataInicial = $scope.todos[i].dataInicial.replace(' ', 'T');
                            $scope.todos[i].dataFinal = $scope.todos[i].dataFinal.replace(' ', 'T');
                        }
                        
                       
                        if(result.data.statusReserva == 0){
                            toastr.error(result.data, "Esta Area já esta resrvada para a data escolhida!")
                        } else {
                            toastr.info(result.data, "Sincronização completa")    
                        }
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }
    }
})();

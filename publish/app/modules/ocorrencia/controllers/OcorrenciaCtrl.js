(function () {
    //'use strict';

    angular
        .module('app')
        .controller('OcorrenciaCtrl', OcorrenciaCtrl);

    OcorrenciaCtrl.$inject = ['$scope', '$http', 'OcorrenciaRepository'];

    function OcorrenciaCtrl($scope, $http, OcorrenciaRepository) {
        $scope.todo = {
            id: 0,
            dataInicial: null,
            dataFinal: null,
            descricao: '',
            status: false,
            idUsuario: 0,
            notificacao: null,
            tratamento: null
        }

        $scope.todos = [];

        Load();
        
        $scope.findUser = function(todo){
            for(let i = 0; $scope.usuarios.length; i++){
                if($scope.usuarios[i].id == todo.idUsuario){
                    return $scope.usuarios[i].nome;
                }
            }
        };

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
            if (todo.id == 0 && todo.assunto != '') {

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

        $scope.sync = function () {
            Sync();
            //VoteLoad();
            //location.reload();
        }

        function Save(item) {
            //item.id = $scope.todos.length + 1;

            $scope.todos.push(item);
        }

        function Delete(item) {
            OcorrenciaRepository
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
                dataInicial: Date.now,
                dataFinal: null,
                descricao: '',
                status: 'Aberta',
                idUsuario: 0,
                notificacao: null,
                tratamento: null

            }
        }


        function Load() {
            if (navigator.onLine) {
                ReadCloud();
                document.getElementById("mySidenav").style.visibility = "visible";
            } else {
                ReadLocal();
                document.getElementById("mySidenav").style.visibility = "visible";
            }
        }

        function Sync() {
            if (navigator.onLine) {
                SaveCloud();
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
            OcorrenciaRepository
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

            OcorrenciaRepository
                    .getUsuarios()
                    .then(
                        function (result) {
                           
                            $scope.usuarios = result.data;
                        },
                        function (error) {
                            toastr.error(error.data, "Falha na requisição");
                        });
        }

        function ReadVote() {
            OcorrenciaRepository
                .getTodos()
                .then(
                    function (result) {
                        for (let i = 0; i < result.data.length; i = i + 1) {
                            result.data[i].dataInicial = result.data[i].dataInicial.replace(' ', 'T');
                            result.data[i].dataFinal = result.data[i].dataFinal.replace(' ', 'T');
                        }
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function SaveCloud() {
            OcorrenciaRepository
                .sync($scope.todos)
                .then(
                    function (result) {

                        for (let i = 0; i < $scope.todos.length; i = i + 1) {
                          
                            $scope.todos[i].id = result.data[i].id;
                            $scope.todos[i].dataInicial = $scope.todos[i].dataInicial.replace(' ', 'T');
                            $scope.todos[i].dataFinal = $scope.todos[i].dataFinal.replace(' ', 'T');
                            
                        }
                        toastr.info(result.data, "Sincronização completa")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }
    }
})();

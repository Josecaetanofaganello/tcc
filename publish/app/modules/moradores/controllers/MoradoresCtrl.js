(function () {
    //'use strict';

    angular
        .module('app')
        .controller('MoradoresCtrl', MoradoresCtrl);

    MoradoresCtrl.$inject = ['$scope', '$http', 'MoradoresRepository'];

    function MoradoresCtrl($scope, $http, MoradoresRepository) {
        $scope.todo = {
            id: 0,
            nome: null,
            contato: null,
            email: null,
            idUnidade: 0
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
            MoradoresRepository
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
                nome: null,
                contato: null,
                email: null,
                idUnidade: 0

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
            MoradoresRepository
                .getTodos()
                .then(
                    function (result) {
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });

            MoradoresRepository
                    .getUsuarios()
                    .then(
                        function (result) {
                           
                            $scope.usuarios = result.data;
                        },
                        function (error) {
                            toastr.error(error.data, "Falha na requisição");
                        });
        }

        function SaveCloud() {
            MoradoresRepository
                .sync($scope.todos)
                .then(
                    function (result) {
                        toastr.info(result.data, "Sincronização completa")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }
    }
})();

(function () {
    //'use strict';

    angular
        .module('app')
        .controller('AssembleiaCtrl', AssembleiaCtrl);

    AssembleiaCtrl.$inject = ['$scope', '$http', 'AssembleiaRepository'];

    function AssembleiaCtrl($scope, $http, AssembleiaRepository) {
        $scope.todo = {
            id: 0,
            assunto: '',
            dataInicial: null,
            dataFinal: null,
            dataAtualizacao: null,
            statusEnquete: false,
            dataCriacao: null,
        }

        $scope.todos = [];

        Load();

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.statusTarefa ? 0 : 1;
            });
            return count;
        };

        $scope.remainingVote = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.statusTarefa ? 0 : 1;
            });
            return count;
        };

        $scope.user = function () {
            loadUser();
            return $scope.usuario.nome;
        }

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
                Save($scope.todo);
            } else {
                Edit();
            }
            New();
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
            location.reload();
        }

        function Save(item) {
            //item.id = $scope.todos.length + 1;

            $scope.todos.push(item);
        }

        function Delete(item) {
            AssembleiaRepository
                .delete(item)
                .then(
                    function (result) {

                        toastr.info(result.data, "Deletado com sucesso!")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function New() {
            $scope.todo = {
                id: 0,
                assunto: '',
                dataInicial: Date.now,
                dataFinal: null,
                dataAtualizacao: null,
                statusEnquete: false,
                dataCriacao: null,
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
            AssembleiaRepository
                .getTodos()
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



        function ReadVote() {
            AssembleiaRepository
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
            AssembleiaRepository
                .sync($scope.todos)
                .then(
                    function (result) {

                        for (let i = 0; i < $scope.todos.length; i = i + 1) {

                            $scope.todos[i].dataInicial = $scope.todos[i].dataInicial.replace(' ', 'T');
                            if (result.data[i].dataFinal != null) {
                                result.data[i].dataFinal = result.data[i].dataFinal.replace(' ', 'T');
                            }
                        }
                        toastr.info(result.data, "Sincronização completa")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }
    }
})();

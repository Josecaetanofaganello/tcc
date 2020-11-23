(function () {
    //'use strict';

    angular
        .module('app')
        .controller('OcorrenciaCtrl', OcorrenciaCtrl);

    OcorrenciaCtrl.$inject = ['$scope', '$http', 'AssembleiaRepository'];

    function OcorrenciaCtrl($scope, $http, AssembleiaRepository) {
        $scope.todo = {
            id: 0,
            assunto: '',
            dataInicial: null,
            dataFinal: null,
            dataAtualizacao: null,
            statusEnquete: false,
            dataCriacao: null,
            positiveVote: 0,
            negativeVote: 0,
            enableVote: true
        }

        $scope.todos = [];

        Load();
        VoteLoad();
        

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



        $scope.upVote = function (todo) {

            toastr.warning("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Voce só poderá votar 1 vez nesta enquete, está certo do seu voto?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            $scope.usuarioVoto = {
                                enquete: todo.id,
                                usuario: localStorage.getItem('id'),
                                tipoVoto: 1,
                            };
                            if (todo.id > 0) {
                                VoteTask($scope.usuarioVoto);
                                todo.enableVote = false;
                            } else {

                                toastr.error("Salve a enquete antes para poder votar!!!");
                            }
                        });
                    }
                });

           
        };

        $scope.downVote = function (todo) {
            toastr.warning("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Voce só poderá votar 1 vez nesta enquete, está certo do seu voto?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            $scope.usuarioVoto = {
                                enquete: todo.id,
                                usuario: localStorage.getItem('id'),
                                tipoVoto: 0,
                            };
                            if (todo.id > 0) {
                                
                                VoteTask($scope.usuarioVoto);
                            } else {

                                toastr.error("Salve a enquete antes para poder votar!!!");
                            }
                        });
                    }
                });

        };

        $scope.save = function (todo) {
            if (todo.id == 0 && todo.assunto != '') {

                var date = new Date();
                todo.statusEnquete = 'Aberta';
                todo.dataInicial = format(date, 'yyyy-MM-ddThh:mm');
                todo.dataCriacao = format(date, 'yyyy-MM-ddThh:mm');
                //Insere 7 dias a data final
                date.setDate(date.getDate() + 7);
               
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
            VoteLoad();
            //location.reload();
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

        function VoteTask(item) {
            AssembleiaRepository
                .vote(item)
                .then(
                    function (result) {

                        toastr.info(result.data, "Votado com sucesso!")
                        VoteLoad();
                    },
                    function (error) {
                        toastr.error(error.data, "Falha no voto");
                    });
        }


        function getNum(val) {
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }

        function VoteLoad() {
            AssembleiaRepository
                .loadVote()
                .then(
                    function (result) {
                        for (let i = 0; i < $scope.todos.length; i = i + 1) {
                            $scope.todos[i].negativeVote = 0;
                            $scope.todos[i].positiveVote = 0;

                            for (let x = 0; x < result.data.length; x = x + 1) {

                                if (result.data[x].enquete == $scope.todos[i].id) {

                                    if (result.data[x].tipoVoto == 0) {
                                        if (isNaN($scope.todos[i].negativeVote)) {
                                            $scope.todos[i].negativeVote = 0;
                                             $scope.todos[i].negativeVote = $scope.todos[i].negativeVote +1;

                                        } else {
                                            $scope.todos[i].negativeVote = $scope.todos[i].negativeVote + 1;
                                        }

                                       

                                    } else {

                                        if (isNaN($scope.todos[i].positiveVote)) {
                                            $scope.todos[i].positiveVote = 0;
                                            $scope.todos[i].positiveVote = $scope.todos[i].positiveVote + 1;
                                        } else {

                                            $scope.todos[i].positiveVote = $scope.todos[i].positiveVote + 1;
                                        }


                                       

                                    }

                                } 



                            }
                            //result.data[0]

                        }

                        toastr.info(result.data, "Votos Carregados!")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha no voto");
                    });
        }

        function New() {
            $scope.todo = {
                id: 0,
                assunto: '',
                dataInicial: Date.now,
                dataFinal: null,
                dataAtualizacao: null,
                statusEnquete: 'Aberta',
                dataCriacao: Date.now,

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

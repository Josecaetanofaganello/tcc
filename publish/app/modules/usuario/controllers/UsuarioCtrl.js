(function () {
    //'use strict';

    angular
        .module('app')
        .controller('UsuarioCtrl', UsuarioCtrl);

    UsuarioCtrl.$inject = ['$scope', '$http', 'UsuarioRepository'];

    function UsuarioCtrl($scope, $http, UsuarioRepository) {
        $scope.todo = {
            id: 0,
            nome: '',
            telefone: null,
            email: null,
            tipo: 0,
            unidade: 0
           
        }

        $scope.todos = [];

        Load();

        $scope.findUnit = function(todo){
            for(let i = 0; $scope.unidades.length; i++){
                if($scope.unidades[i].id == todo.apto){
                    return ($scope.unidades[i].bloco + ' - ' +$scope.unidades[i].identificacao);
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
            if (todo.id == 0) {
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
        }

        function Save(item) {
            //item.id = $scope.todos.length + 1;

            $scope.todos.push(item);
        }

        function Delete(item) {
            UsuarioRepository
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
                nome: '',
                telefone: null,
                email: null,
                tipo: 0,
                unidade: 0

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
            UsuarioRepository
                .getTodos()
                .then(
                    function (result) {
                       
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });

        UsuarioRepository
                    .getUnidades()
                    .then(
                        function (result) {
                           
                            $scope.unidades = result.data;
                        },
                        function (error) {
                            toastr.error(error.data, "Falha na requisição");
                        });

        }


        function SaveCloud(todo) {
            UsuarioRepository
                .sync(todo)
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

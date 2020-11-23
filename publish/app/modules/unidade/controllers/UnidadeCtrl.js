(function () {
    //'use strict';

    angular
        .module('app')
        .controller('UnidadeCtrl', UnidadeCtrl);

    UnidadeCtrl.$inject = ['$scope', '$http', 'UnidadeRepository'];

    function UnidadeCtrl($scope, $http, UnidadeRepository) {
        $scope.unidade = {
            id: 0,
            identificacao: '',
            bloco: '',
            garagem: '',
            veiculo: '',
            proprietario: 0

        }

        $scope.unidades = [];
        $scope.usuarios = [];

        Load();

        $scope.findUser = function(unidade){
            for(let i = 0; $scope.usuarios.length; i++){
                if($scope.usuarios[i].id == unidade.proprietario){
                    return $scope.usuarios[i].nome;
                }
            }
        };

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.unidades, function (unidade) {
                count += unidade.statusTarefa ? 0 : 1;
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



        $scope.save = function (unidade) {
            if (unidade.id == 0 && unidade.descricao != '') {
                Save($scope.unidade);
            } else {
                Edit();
            }
            New();
        }

        $scope.new = function () {
            New();
        }

        $scope.edit = function (unidade) {
            $scope.unidade = unidade;
        }

        $scope.delete = function (unidade) {
            toastr.error("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Deseja realmente apagar?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            Delete(unidade);
                            var index = $scope.unidades.indexOf(unidade)
                            $scope.unidades.splice(index, 1);
                        });
                    }
                });

        }

        $scope.sync = function (unidade) {
            Sync(unidade);
            location.reload();
        }

        function Save(item) {
            //item.id = $scope.unidades.length + 1;

            $scope.unidades.push(item);
        }

        function Delete(item) {
            UnidadeRepository
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
            $scope.unidade = {
                id: 0,
            identificacao: '',
            bloco: '',
            garagem: '',
            veiculo: '',
            proprietario: 0
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

        function Sync(unidade) {
            if (navigator.onLine) {
                SaveCloud(unidade);
            } else {
                SaveLocal();
            }
        }

        function ReadLocal() {
            $scope.unidades = angular.fromJson(localStorage.getItem("unidades"));
            toastr.info('Informações carregadas do disco local...', 'Tudo certo!');
        }

        function SaveLocal() {
            localStorage.setItem("unidades", angular.toJson($scope.unidades));
            toastr.warning('Informações persistidas localmente...', 'Sincronizando');
        }

        function ReadCloud() {
            UnidadeRepository
                .getUnidades()
                .then(
                    function (result) {
                    
                        $scope.unidades = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });

            UnidadeRepository
                .getUsuarios()
                .then(
                    function (result) {
                       
                        $scope.usuarios = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function SaveCloud(unidade) {
            UnidadeRepository
                .sync(unidade)
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

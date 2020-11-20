(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$http','$scope', 'UserRepository', '$location'];

    function SignUpCtrl($http,$scope, UserRepository, $location) {
        $scope.signupModel = {
            nome: '',
            email: '',
            telefone: '',
            senha: '',
            apto: '',
            confirmPassword: '',
            id: 0
        };

        ReadAptos();

        $scope.signup = function ($event) {
            console.log($event);
            UserRepository.register($scope.signupModel).then(
                function (result) {
                    toastr.success(result, 'Cadastro efetuado com sucesso');
                    openNav();
                    $location.path('/signup-success');
                },
                function (error) {
                    toastr.error(error.data.message, 'Falha no registro');
                });
        }

        $scope.closeModal = function (result) {
            dialog.close(result);
        };

        $scope.matchPassword = function () {
            return $scope.password === $scope.repassword;
        };
            

        function ReadAptos() {
            UserRepository
                .loadAptos()
                .then(
                    function (result) {
                        $scope.aptos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição de lista de aptos");
                    });
        }
    }
})();

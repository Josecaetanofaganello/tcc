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



        $scope.signup = function ($event) {
            console.log($event);
            UserRepository.register($scope.signupModel).then(
                function (result) {
                    toastr.success(result, 'Cadastro efetuado com sucesso');
                    $location.path('/signup-success');
                },
                function (error) {
                    toastr.error(error.data, 'Falha no registro');
                });
        }

        $scope.closeModal = function (result) {
            dialog.close(result);
        };

        $scope.matchPassword = function () {
            return $scope.password === $scope.repassword;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8084/unidade/listar/',
            data: { applicationId: 3 }
        }).success(function (result) {
            $scope.aptos = result;
        });
    }
})();

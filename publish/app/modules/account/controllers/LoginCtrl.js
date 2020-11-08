(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', '$location', 'AuthRepository', 'UserRepository'];

    function LoginCtrl($rootScope, $scope, $location, AuthRepository, UserRepository) {

        $scope.login = {
            email: '',
            password: ''
        }

        $scope.authenticate = function () {
            var promise = AuthRepository.getToken($scope.login.email, $scope.login.password).then(
                   function (result) {
                    localStorage.setItem('tipo', result.tipo);
                    localStorage.setItem('id', result.id);
                    $rootScope.isAuthorized = true;
                    UserRepository.setCurrentProfile(result.id);
                    $location.path('/');
                   },
                   function (error) {
                       toastr.error(error.responseJSON.message, 'Falha na autenticação');
                   });
        }
    }
})();

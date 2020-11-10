(function () {
    'use strict';

    angular.module('test', []).controller('AptoCtrl', function ($scope, $http) {
        $scope.selectedTestAccount = null;
        $scope.testAccounts = [];

        $http({
            method: 'GET',
            url: 'http://localhost:8084/usuario/pesquisar/',
            data: { applicationId: 3 }
        }).success(function (result) {
            $scope.testAccounts = result;
        });
    });
});

(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$rootScope', '$scope', '$location'];

    function AppCtrl($rootScope, $scope, $location) {
        $rootScope.changeTheme = function (theme) {
            $rootScope.theme = theme;
            localStorage.setItem('theme', theme);
        };
       
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthRepository', AuthRepository);

    AuthRepository.$inject = ['$http', '$rootScope', 'UserRepository'];

    function AuthRepository($http, $rootScope, UserRepository) {
        return {
            getToken: function (username, password) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:8084/usuario/autenticar",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "bearer f3a3a5d0-4fde-4616-bf25-6826f1fd6aed",
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": "{\"email\":\"" + username + "\", \"senha\":\"" + password+"\"}"
                }
               
                return $.ajax(settings).done(function (response) {
                    response
                });
            }
        };
        ;
    }
})();
﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserRepository', UserRepository);

    UserRepository.$inject = ['$http', '$rootScope', '$location'];

    function UserRepository($http, $rootScope, $location) {
        return {
            setCurrentProfile: function (id) {
                return $http.get("http://localhost:8084/usuario/consultar/" + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                    .then(
                        function (result) {
                            $rootScope.user = {
                                id: result.id,
                                nome: result.nome,
                                email: result.email,
                                tipo: result.tipo,
                                theme: "Default",
                                id: 0
                            };
                        },
                        function (error) {
                            ClearUserData();
                        });
            },
            clearUserData: function () {
                ClearUserData();
            },
            register: function (user) {
                return $http.post("http://localhost:8084/usuario/salvar", user, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            resetPassword: function (email) {
                return $http.post("/api/account/resetpassword", email, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            }
        };

        function ClearUserData() {
            $rootScope.isAuthorized = false;
            $rootScope.user = {
                id: 0,
                nome: '',
                email: '',
                tipo: '',
                theme: ''
            };
            localStorage.setItem('token', '');
            $location.path('/login');
        }
    }
})();
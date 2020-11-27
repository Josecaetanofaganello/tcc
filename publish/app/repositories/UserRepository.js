(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserRepository', UserRepository);

    UserRepository.$inject = ['$http', '$rootScope', '$location'];

    function UserRepository($http, $rootScope, $location) {
        return {
            setCurrentProfile: function (id) {
                return $http.get($rootScope.baseUrl+"/usuario/consultar/" + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
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
                return $http.post($rootScope.baseUrl +"/usuario/salvar", user, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            resetPassword: function (email) {
                return $http.get($rootScope.baseUrl +"/usuario/resetpassword/" + email, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            loadAptos: function () {
                return $http.get($rootScope.baseUrl + "/unidade/listar" , { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
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
(function () {
    'use strict';

    angular
        .module('app')
        .factory('UsuarioRepository', UsuarioRepository);

    UsuarioRepository.$inject = ['$http', '$rootScope', '$location'];

    function UsuarioRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl + "/usuario/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            sync: function (todo) {
        
                return $http.post($rootScope.baseUrl + "/usuario/atualizar", todo, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/usuario/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getUnidades: function () {
                return $http.get($rootScope.baseUrl +"/unidade/listar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
          
        };
    }
})();
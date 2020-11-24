(function () {
    'use strict';

    angular
        .module('app')
        .factory('MoradoresRepository', MoradoresRepository);

    MoradoresRepository.$inject = ['$http', '$rootScope', '$location'];

    function MoradoresRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl + "/morador/listar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
            sync: function (todos) {
        
                return $http.put($rootScope.baseUrl + "/morador/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/morador/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getUsuarios: function () {
                return $http.get($rootScope.baseUrl +"/usuario/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
            
        };
    }
})();
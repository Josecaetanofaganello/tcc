(function () {
    'use strict';

    angular
        .module('app')
        .factory('UnidadeRepository', UnidadeRepository);

    UnidadeRepository.$inject = ['$http', '$rootScope', '$location'];

    function UnidadeRepository($http, $rootScope, $location) {
        return {
            getUnidades: function () {
                return $http.get($rootScope.baseUrl +"/unidade/listar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
            sync: function (unidade) {
                return $http.put($rootScope.baseUrl +"/unidade/atualizar", unidade, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl +"/unidade/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getUsuarios: function () {
                return $http.get($rootScope.baseUrl +"/usuario/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
            
        };
    }
})();
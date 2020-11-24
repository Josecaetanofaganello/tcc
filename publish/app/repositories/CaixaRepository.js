(function () {
    'use strict';

    angular
        .module('app')
        .factory('CaixaRepository', CaixaRepository);

    CaixaRepository.$inject = ['$http', '$rootScope', '$location'];

    function CaixaRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl + "/caixa/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })




            },
            sync: function (todos) {
        
                for (let i = 0; i < todos.length; i = i + 1) {
                    if (todos[i].data != null) {
                        todos[i].data = todos[i].data.replace('T', ' ');
                    }
                    if (todos[i].dataInsercao != null) {
                        todos[i].dataInsercao = todos[i].dataInsercao.replace('T', ' ');
                    }
                }

                return $http.post($rootScope.baseUrl + "/caixa/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },

            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/caixa/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            vote: function (todo) {
                return $http.post($rootScope.baseUrl + "/assembleia/votar", todo, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },

            loadVote: function () {
                return $http.post($rootScope.baseUrl + "/assembleia/pesquisar-votos",  { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
        };
    }
})();
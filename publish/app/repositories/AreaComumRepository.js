(function () {
    'use strict';

    angular
        .module('app')
        .factory('AreaComumRepository', AreaComumRepository);

    AreaComumRepository.$inject = ['$http', '$rootScope', '$location'];

    function AreaComumRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl + "/enquete/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            sync: function (todos) {
        
                for (let i = 0; i < todos.length; i = i + 1) {
                    if (todos[i].dataInicial != null) {
                        todos[i].dataInicial = todos[i].dataInicial.replace('T', ' ');
                    }
                    if (todos[i].dataFinal != null) {
                        todos[i].dataFinal = todos[i].dataFinal.replace('T', ' ');
                    }
                    if (todos[i].dataCriacao != null) {
                        todos[i].dataCriacao = todos[i].dataCriacao.replace('T', ' ');
                    }


                }

                return $http.post($rootScope.baseUrl + "/enquete/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/enquete/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            vote: function (todo) {
                return $http.post($rootScope.baseUrl + "/assembleia/votar", todo, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },

            loadVote: function () {
                return $http.post($rootScope.baseUrl + "/assembleia/pesquisar-votos",  { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getAreas: function () {
                return $http.get($rootScope.baseUrl + "/area-comum/listar",  { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
        };
    }
})();
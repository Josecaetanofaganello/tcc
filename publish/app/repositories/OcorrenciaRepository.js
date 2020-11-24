(function () {
    'use strict';

    angular
        .module('app')
        .factory('OcorrenciaRepository', OcorrenciaRepository);

    OcorrenciaRepository.$inject = ['$http', '$rootScope', '$location'];

    function OcorrenciaRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl + "/ocorrencia/listar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
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

                return $http.put($rootScope.baseUrl + "/ocorrencia/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/ocorrencia/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            
        };
    }
})();
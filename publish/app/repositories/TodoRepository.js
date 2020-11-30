(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoRepository', TodoRepository);

    TodoRepository.$inject = ['$http', '$rootScope', '$location'];

    function TodoRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get($rootScope.baseUrl +"/tarefa/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                    
             


            },
            sync: function (todos) {
                for (let i = 0; i < todos.length; i = i + 1) {
                    if (todos[i].dataInicial != null) {
                        todos[i].dataInicial = todos[i].dataInicial.replace('T', ' ');
                    }
                    if (todos[i].dataFinal != null) {
                        todos[i].dataFinal = todos[i].dataFinal.replace('T', ' ');
                    }
                    if (todos[i].dataAtualizacao != null) {
                        todos[i].dataAtualizacao = todos[i].dataAtualizacao.replace('T', ' ');
                    }


                }

                return $http.post($rootScope.baseUrl +"/tarefa/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl +"/tarefa/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
        };
    }
})();
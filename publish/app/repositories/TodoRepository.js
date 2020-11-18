(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoRepository', TodoRepository);

    TodoRepository.$inject = ['$http', '$rootScope', '$location'];

    function TodoRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get("http://localhost:8084/tarefa/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                    
             


            },
            sync: function (todos) {
                for (let i = 0; i < todos.length; i = i + 1) {

                    todos[i].dataInicial = todos[i].dataInicial.replace('T', ' ');
                    todos[i].dataFinal = todos[i].dataFinal.replace('T', ' ');
                   
                }

                return $http.post("http://localhost:8084/tarefa/atualizar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
        };
    }
})();
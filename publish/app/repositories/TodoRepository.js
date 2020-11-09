(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoRepository', TodoRepository);

    TodoRepository.$inject = ['$http', '$rootScope', '$location'];

    function TodoRepository($http, $rootScope, $location) {
        return {
            getTodos: function () {
                return $http.get("http://localhost:8084/usuario/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
            sync: function (todos) {
                return $http.post("http://localhost:8084/usuario/pesquisar", todos, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
            },
        };
    }
})();
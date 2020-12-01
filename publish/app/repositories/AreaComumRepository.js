(function (){
    'use strict';

    angular
        .module('app')
        .factory('AreaComumRepository', AreaComumRepository);

    AreaComumRepository.$inject = ['$http', '$rootScope', '$location'];

    function AreaComumRepository($http, $rootScope, $location){
        return {
            getTodos: function (usuario) {
                return $http.get($rootScope.baseUrl + "/reserva/listar/"+usuario.id+"/"+usuario.tipo, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
            sync: function (todo) {
                        
                    if (todo.dataInicial != null) {
                        todo.dataInicial = todo.dataInicial.replace('T', ' ');
                    }
                    if (todo.dataFinal != null) {
                        todo.dataFinal = todo.dataFinal.replace('T', ' ');
                    }
                    if (todo.dataCriacao != null) {
                        todo.dataCriacao = todo.dataCriacao.replace('T', ' ');
                    }

                return $http.post($rootScope.baseUrl + "/reserva/atualizar", todo, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
                
            },
            delete: function (item) {
                return $http.delete($rootScope.baseUrl + "/reserva/deletar/" + item.id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getAreas: function () {
                return $http.get($rootScope.baseUrl + "/area-comum/listar",  { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

            },
            getUsuarios: function () {
                return $http.get($rootScope.baseUrl +"/usuario/pesquisar", { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            },
        };
    }
})();
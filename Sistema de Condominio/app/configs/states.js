(function () {
    'use strict';

var app = angular.module("myApp", ['ngCookies','ngAnimate','ngSanitize','ngAria', 'ngMaterial', 'ui.router', 'ui.bootstrap', 'ui.utils.masks','ngMessages','chart.js' ])
    
    app.config(function ($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: './views/login.html',
                    controller: "loginCtrl as vm"
                })
                .state('register', {
                    url: '/register',
                    templateUrl: './views/register.html',
                    controller: "registerCtrl as vm"
                })
                .state('home', {
                    url: '/home',
                    templateUrl: './views/home.html',
                    controller: "homeCtrl as vm"
                })
                .state('movimentacoesList', {
                    url: '/movimentacoes',
                    templateUrl: './views/movimentacoesList.html',
                    controller: "movimentacoesListCtrl as vm"
                })
                .state('movimentacoesCad', {
                    url: '/movimentacoes/cadastro/',
                    templateUrl: './views/movimentacoesCad.html',
                    controller: "movimentacoesCadCtrl as vm"
                })
                .state('movimentacoesEdit', {
                    url: '/movimentacoes/:id',
                    templateUrl: './views/movimentacoesCad.html',
                    controller: "movimentacoesCadCtrl as vm"
                })
                .state('categorias', {
                    url: '/categorias',
                    templateUrl: './views/categorias.html',
                    controller: "categoriasCtrl as vm"
                })
                .state('logout', {
                    url: '/login',
                    templateUrl: './views/login.html',
                    controller: "loginCtrl as vm"
                })
                .state('usuarios', {
                    url: '/usuarios',
                    templateUrl: './views/usuarios.html',
                    controller: "usuariosCtrl as vm"
                })
        })

        app.run(['$http', '$rootScope', '$location', function ($http, $rootScope, $location) {
            // Usuário logado        
            $rootScope.isAuthorized = false;
            $rootScope.user = {
                name: '',
                email: ''
            };
    
            // Verifica se não existe um token
            if (!localStorage.getItem('token')) {
                localStorage.setItem('token', '');
            } else {
                $rootScope.isAuthorized = true;
              
            }
    
            // Verifica o tema
            if (!localStorage.getItem('theme')) {
                localStorage.setItem('theme', 'default');
                $rootScope.theme = 'default';
            } else {
                $rootScope.theme = localStorage.getItem('theme');
            }
    
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next.requireLogin && $rootScope.isAuthorized == false) {
                    $location.path('/account/login');
                }
            });
        }]);

})();


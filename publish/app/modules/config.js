(function () {
    'use strict';
    var id = 'app';

    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ui.bootstrap']);

    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                templateUrl: 'modules/home/views/index.html',
                requireLogin: true
            })
            .when('/account/login', {
                controller: 'LoginCtrl',
                templateUrl: 'modules/account/views/login.html',
                requireLogin: false
            })
            .when('/tarefa', {
                controller: 'TarefaCtrl',
                templateUrl: 'modules/tarefa/views/tarefa.html',
                requireLogin: true
            })
            .when('/assembleia', {
                controller: 'AssembleiaCtrl',
                templateUrl: 'modules/assembleia/views/assembleia.html',
                requireLogin: true
            })
            .when('/caixa', {
                controller: 'CaixaCtrl',
                templateUrl: 'modules/caixa/views/caixa.html',
                requireLogin: true
            })
            .when('/account/logout', {
                controller: 'LogoutCtrl',
                templateUrl: 'modules/account/views/logout.html',
                requireLogin: false
            })
            .when('/account/signup', {
                controller: 'SignUpCtrl',
                templateUrl: 'modules/account/views/signup.html',
                requireLogin: false
            })
            .when('/account/forgot-password', {
                controller: 'ForgotPasswordCtrl',
                templateUrl: 'modules/account/views/forgot-password.html',
                requireLogin: false
            })
            .when('/unidade', {
                controller: 'UnidadeCtrl',
                templateUrl: 'modules/unidade/views/unidade.html',
                requireLogin: true
            })
            .when('/ocorrencia', {
                controller: 'OcorrenciaCtrl',
                templateUrl: 'modules/ocorrencia/views/ocorrencia.html',
                requireLogin: true
            })
            .otherwise({
                controller: 'HomeCtrl as vm',
                templateUrl: 'modules/home/views/404.html',
                requireLogin: true
            });
    });

    app.run(['$http', '$rootScope', '$location', 'UserRepository', function ($http, $rootScope, $location, UserRepository) {
        // Usuário logado        
        $rootScope.isAuthorized = false;
        $rootScope.baseUrl = 'http://localhost:8084';
        $rootScope.user = {
            name: '',
            email: ''
        };

        // Verifica se não existe um token
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', '');

        } else {
            $rootScope.isAuthorized = true;
            UserRepository.setCurrentProfile(localStorage.getItem('id'));
        }

        // Verifica o tema
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'journal');
            $rootScope.theme = 'journal';
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
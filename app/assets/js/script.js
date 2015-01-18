var app = angular.module('appointio-marketing', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.
        when('/index', {
            templateUrl: 'default'
        }).
        when('/kontakt', {
            templateUrl: 'contact'
        }).
        when('/preise', {
            templateUrl: 'price'
        }).
        when('/tos', {
            templateUrl: 'tos'
        }).
        when('/team', {
            templateUrl: 'team'
        }).
        when('/privacy', {
            templateUrl: 'privacy'
        }).
        otherwise('/index');
});

$(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});
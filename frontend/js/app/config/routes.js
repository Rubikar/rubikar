'use strict';

angular.module(ModuleName).config([
  '$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/home', {
        templateUrl: 'js/app/views/home/home.html',
        controller: 'HomeController'
      });
  }
]);

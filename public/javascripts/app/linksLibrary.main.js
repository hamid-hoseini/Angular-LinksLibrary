import { default as controllersModuleName } from './linksLibrary.controllers';
import { default as servicesModuleName } from './linksLibrary.services';


var moduleName = 'linksLibrary';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'templates/home.html'
/*      controller:'linksLibrary.listController',
      controllerAs:'vm'*/
    })
      .when('/links/linksList',{
          templateUrl:'templates/linksList.html',
          controller:'linksLibrary.linksListCtrl',
          controllerAs:'vm'
      })
      .when('/links/addLinks',{
          templateUrl:'templates/addLinks.html',
          controller:'linksLibrary.addLinksCtrl',
          controllerAs:'vm'
      })
    .otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, ['ngRoute','ngMessages',servicesModuleName, controllersModuleName])
    .config(config);


export default moduleName;
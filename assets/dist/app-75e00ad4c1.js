var $stateProviderRef = null,
    $urlRouterProviderRef = null;

npwmApp.config(function($stateProvider,$urlRouterProvider, $locationProvider, $httpProvider){
    $stateProviderRef = $stateProvider;
    $urlRouterProviderRef = $urlRouterProvider;

    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('','/');
    $httpProvider.defaults.useXDomain = true
    $stateProvider.state('index',{
        url: '/',
        templateUrl: 'index.html',
        controller: 'indexCtrl',
    }).state('search',{
        url: '/search/:query',
        templateUrl: 'search.html',
        controller: 'searchCtrl'
    }).state('restaurant',{
        url: '/restaurant/:id',
        templateUrl: 'restaurant.html',
        controller: 'restaurantCtrl'
    });
});
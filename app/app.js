'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
          url: '/profile',
          templateUrl: 'users/profile.html',
          controller: 'ProfileCtrl as profileCtrl',
          resolve: {
            auth: function($state, Users, Auth){
              return Auth.$requireAuth().catch(function(){
                $state.go('home');
              });
          },
            profile: function(Users, Auth){
              return Auth.$requireAuth().then(function(auth){
                return Users.getProfile(auth.id).$loaded;
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://luminous-fire-5758.firebaseio.com'); //link to my firebase

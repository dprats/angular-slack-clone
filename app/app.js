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
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              console.log('promise on state:Home succesfully resolved');
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              var userEmail = auth.password.email;
              console.log('user ' + userEmail + ' has no need to login');
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){

              var userEmail = auth.password.email;
            
              console.log('user ' + userEmail +' has no need to register');
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
          
              return Users.getProfile(auth.id).$loaded();
            });
          }
        }
      });
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          //two dependencies:

          //"channels" promises our $firebaseArray of channels
          channels: function(Channels){
              //$loaded is a function provided by $firebaseArray and $firebaseObject
              //that returns a promise that gets resolved when the data from firebase is 
              //available locally
            return Channels.$loaded();
          },
          //"profile" is like "profile(dependency)" in "profile(state)" but we are
          //ensuring the user already has a displayName set, otherwise they are taken to
          //the "profile(state)" and if they are not authenticated they are sent to the
          //"home(state)"
          profile: function($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function(profile){

                if (profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        } 
      })
      //child state of the channels controller
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://luminous-fire-5758.firebaseio.com/'); //link to my firebase

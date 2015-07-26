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
<<<<<<< HEAD
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              console.log('promise on state:Home succesfully resolved');
              $state.go('home');
            }, function(error){
              return;
=======
        //resolve is a property you can attach to a route. Resolve contains one or more promises
        //that must resolve successfully before the route will change. You can wait for data to become
        //available before showing a view, and sinplify the initialization of the controller.
        resolve: {
          requireNoAuth: function($state , Auth){
            //$requireAuth() is a helper function which returns a promise with the 
            //current authentication state if the user is authenticated. Otherwise rejects the promise.
            return Auth.$requireAuth().then(function(auth){
              $state.go('channels');
            }, function(error){
              return
>>>>>>> channels_branch
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
<<<<<<< HEAD
=======
        controller: 'AuthCtrl as authCtrl',
>>>>>>> channels_branch
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
<<<<<<< HEAD
=======
        controller: 'AuthCtrl as authCtrl',
>>>>>>> channels_branch
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
                return Users.getProfile(auth.id).$loaded;
            });
          }
        }
      }).
      state('channels', {
        url: '/channels',
        templateUrl: 'channels/index.html',
        controller: 'ChannelsCtrl as channelsCtrl',
        resolve: {

          //this is a dependency passed to controllers dealing with the channels state.
          //it passes a list of all channels
          channels: function(Channels){
            //channels returns a $firebaseArray(ref). $loaded is a helper method of $firebaseArray().
            //$loaded() returns a promise which is resolved when the initial data has been downloaded
            //from the database. Promise resolves to the $firebaseArray.
            return Channels.$loaded();
            },
          //this is a dependency custom to the state which can be passed to controllers relating to channels(state).
          //profile is a method which tries to authenticate a user. if successful, it returns
          //that user's profile. 
         
          profile: function($state, Auth, Users){
            //Auth.requireAuth() returns a promise fulfilled with the current authentication state 
            //if the user is authenticated but otherwise rejects the promise. 
            return Auth.$requireAuth().then(function(auth){
<<<<<<< HEAD
          
              return Users.getProfile(auth.id).$loaded();
=======

              // if the user is already authenticated, get the user's profile from the auth.id
              //( note: $loaded() is a method from $firebaseArray which returns a promise which is resolved 
              //  when the data from Firebase is available locally)
              return Users.getProfile(auth.uid).$loaded().then(function(profile){
                //if the profile returned has a display name, return it.
                if (profile.displayName){
                  return profile;
                //... otherwise go back to HOME state
                } else {
                  $state.go('home');
                }
              });
            }, function(error){
              //if one cannot is not authenticated... change state to 'home'
              console.log('User is not Authenticated so we cannot get her profile');
              $state.go('home');
>>>>>>> channels_branch
            });
          }
        }
      }).
      state('channels.create', { //this is a child state of the channels state
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'

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

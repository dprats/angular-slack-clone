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

        //resolve is a property you can attach to a route. Resolve contains one or more promises
        //that must resolve successfully before the route will change. You can wait for data to become
        //available before showing a view, and sinplify the initialization of the controller.
        resolve: {
          requireNoAuth: function($state , Auth){
            //$requireAuth() is a helper function which returns a promise with the 
            //current authentication state if the user is authenticated. Otherwise rejects the promise.
            console.log('attempting to resolve the requireNoAuth promise on home state...');
            return Auth.$requireAuth().then(function(auth){
              console.log('requireNoAuth promise on home.resolve was resolved. Heading to CHANNELS');
              $state.go('channels');
            }, function(error){
              return

            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',

        controller: 'AuthCtrl as authCtrl',

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

        controller: 'AuthCtrl as authCtrl',

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
              console.log('PROFILE: checking if the user is authenticated...');
              return Auth.$requireAuth().catch(function(){
                console.log('user is NOT authenticated so we are going HOME');
                $state.go('home');
              });
            },
            profile: function(Users, Auth){
              console.log('getting the users profile...');
              return Auth.$requireAuth().then(function(auth){
                //$loaded() is a function from $firebaseArray that returns a promise resolved 
                //when data is available locally
                return Users.getProfile(auth.uid).$loaded();
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
              console.log('attempting to resolve channels.profile promise...');
              // if the user is already authenticated, get the user's profile from the auth.id
              //( note: $loaded() is a method from $firebaseArray which returns a promise which is resolved 
              //  when the data from Firebase is available locally)

              return Users.getProfile(auth.uid).$loaded().then(function(profile){
                console.log('channels.profile promise was able to resolve the getProfile...');
                //if the profile returned has a display name, return it.
                console.log('profile: ');
                console.log(profile);
                if (profile.displayName){
                  return profile;
                //... otherwise go back to HOME state
                } else {
                  console.log('user has no displayName so heading to PROFILE');
                  
                  $state.go('profile');
                }
              });
            }, function(error){
              //if one cannot is not authenticated... change state to 'home'
              console.log('User is not Authenticated so we cannot get her profile. Heading to HOME');
              $state.go('home');

            });
          }
        }
      }).
      state('channels.create', { //this is a child state of the channels state
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'

      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://luminous-fire-5758.firebaseio.com/'); //link to my firebase

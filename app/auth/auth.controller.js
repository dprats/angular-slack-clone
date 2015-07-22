
angular.module('angularfireSlackApp').controller('AuthCtrl',['Auth', '$state', function(Auth, $state){
  //"$state is provided by ui-router to control the state of our application
  //we can use the go() function to redirect our application to a specific state. 

  //we use "this" because we are going to use the "Controller As" syntax
  var authCtrl = this;
  console.log('Hello from auth.controller.js');

  //this object will be used with the ng-model directive on our form
  authCtrl.user = {
    email: '',
    password: ''
  };
  //we need two functions, one on our controller. One for registering users and one for logging in users
  //$firebaseAuth provides two functions we can use: $authWithPassword and $createUser for registering
  //both of these functions take a user object and return a promise.

  authCtrl.login2 = function(){

    console.log('hello from authCtrl.login2.')
  };

  authCtrl.login = function(){
    console.log('trying to log in...');

    Auth.$authWithPassword(authCtrl.user).then(function(auth){
      console.log("successful login! for user: " + auth.password.email);
      $state.go('home'); 
    }, function(error){
      console.log('Error logging in');
      authCtrl.error = error;
    });
  };

  authCtrl.register = function(){
    Auth.$createUser(authCtrl.user).then(function(success){
      console.log("successful register!");
      authCtrl.login();
    }, function(error){
      AuthCtrl.error = error;
    });
  };


}]);
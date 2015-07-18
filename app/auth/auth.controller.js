
angularfireSlackApp.controller('AuthCtrl',['Auth', '$state', function(Auth, $state){
  //"$state is provided by ui-router to control the state of our application
  //we can use the go() function to redirect our application to a specific state. 

  //we use "this" because we are going to use the "Controller As" syntax
  var authCtrl = this;

  //this object will be used with the ng-model directive on our form
  authCtrl.user = {
    email: '',
    password: ''
  };
  //we need two functions, one on our controller. One for registering users and one for logging in users
  //$firebaseAuth provides two functions we can use: $authWithPassword and $createUser for registering
  //both of these functions take a user object and return a promise.

  authCtrl.login = function(){
    Auth.$authWithPassword(authCtrl.user).then(function(auth){
      $state.go('home'); 
    }, function(error){
      authCtrl.error = error;
    });
  };

  authCtrl.register = function(){
    Auth.$createUser(authCtrl.user).then(function(success){
     authCtrl.login();
    }, function(error){
      AuthCtrl.error = error;
    })
  };


}]);
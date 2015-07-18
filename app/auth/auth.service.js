//created a factory for authenticating
angular.module('angularfireSlackApp')
	.factory('Auth', function($firebaseAuth,FirebaseUrl){ //$firebaseAuth came from firbase module

		var ref = new Firebase(FirebaseUrl);
		//https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication
		return $firebaseAuth(ref);

});
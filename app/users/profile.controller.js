angular.module('angularfireSlackApp').
	controller('ProfileCtrl', ['$state', 'md5', 'auth', 'profile', function($state, md5, auth, profile){
		var profileCtrl = this;
		//set profile in the controller to the one that was resolved by the router
		profileCtrl.profile = profile;
		//update profile in the controller
		profileCtrl.updateProfile = function(){
			//getting the current user's email from the auth data that was resolved
			//from our router, hashing it and setting it equal to emailHash on profile
			profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
			//displayName will be set from the template we'll be creating next using ng-model
			profileCtrl.profile.$save;
		}
	}]);
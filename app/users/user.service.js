angular.module('angularfireSlackApp')
	.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

		//create a reference to the users node

		//data in firebase is stored in a tree structure and child nodes can be referenced by 
		//adding a path to our FirebaseUrl so https://firebase-name-here.firebase.io.com/users 
		//refers to the users node.
		var usersRef = new Firebase(FirebaseUrl + 'users');

		//create a $firebaseArray using the reference
		var users = $firebaseArray(usersRef); 

		var Users = {

			//allows us to get a $firebaseObject of a specific user's profile
			getProfile: function(uid){
				return $firebaseObject(usersRef.child(uid));
			},
			//helper function that returns a user's displayname when given a uid
			getDisplayNames: function(uid){
				return users.$getRecord(uid).displayName;
			},
			all: users,
			
			gravatar: function(uid){
				return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
			}
		};
		return Users;

	});
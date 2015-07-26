//Create a service for retrieving messages

angular.module('angularfireSlackApp')
	.factory('Messages', function($firebaseArray, FirebaseUrl){

		var channelsMessagesRef = new Firebase(FirebaseUrl + 'channelMessages');

		var userMessagesRef = new Firebase(FirebaseUrl + 'userMessages');

		return {
			//returns a firebaseArray of messages when provided a channelId.
			forChannel: function(channelId){
				return $firebaseArray(channelsMessagesRef.child(channelId));
			},
			//Add a forUsers function to our Messages service to retrieve direct 
			//messages between two users, given their uids.
			forUsers: function(userId1, userId2){
				var path =	uid1 < uid2 ? uid1 + '/' + uid2: uid2 + '/' + uid1;

				return $firebaseArray(userMessagesRef.child(path));
			}
		};
	});
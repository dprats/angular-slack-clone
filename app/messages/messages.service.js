//Create a service for retrieving messages

angular.module('angularfireSlackApp')
	.factory('Messages', function($firebaseArray, FirebaseUrl){

		var channelsMessagesRef = new Firebase(FirebaseUrl + 'channelMessages');

		return {
			//returns a firebaseArray of messages when provided a channelId.
			forChannel: function(channelId){
				return $firebaseArray(channelsMessagesRef).child(channelId);
			}
		};
	});
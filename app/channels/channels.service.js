
//service Channels that will return $firebaseArray at the channels node
angular.module('angularfireSlackApp')
	.factory('Channels', function($firebaseArray, FirebaseUrl){

		var channelRef = new Firebase(FirebaseUrl + 'channels');

		var channels = $firebaseArray(channelRef);

		return channels;
	});

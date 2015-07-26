//Create a service "Channels" channels.service.js that will return a $firebaseArray at the channels node

angular.module('angularfireSlackApp')
	.factory('Channels', function($firebaseArray, FirebaseUrl){

		var ref = new Firebase(FirebaseUrl + 'channels');

		var channels = $firebaseArray(ref);

		return channels;

	});
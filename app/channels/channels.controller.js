angular.module('angularfireSlackApp').
	controller('ChannelsCtrl', function($state, Auth, Users, profile, channels){

		var channelsCtrl = this;

		//set channels and profile to the resolved dependencies from the router
		channels = channelsCtrl.channels;
		profile = channelsCtrl.profile;

		//set getDisplayName and getGravatar to the respective function on Users service
		var getDisplayName = Users.getDisplayName;
		var getGravatar = Users.getGravatar;

		//create a logot function that will allow our users to log out 
		//returning them to the home state
		channelsCtrl.logout = function(){
			Auth.$unauth();
			$state.go('home');
		};

		channelsCtrl.newChannel = {
			name: ''
		};

		channelsCtrl.createChannel = function(){
			//the $add function on $firebaseArray provides similar functionality to .push() on Array
			//but keeps the data on sync with firebase
			channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
				//once new channel is created, we clear out the newChannel object
				channelsCtrl.newChannel = {
					name: ''
				};
			});
		};
	});
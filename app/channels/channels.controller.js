<<<<<<< HEAD
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

=======
//Create ChannelsCtrl in injecting $state, Auth, profile, and channels.

angular.module('angularfireSlackApp')
	.controller('ChannelsCtrl', function($state, Auth, Users, profile, channels){

		var channelsCtrl = this;

		// Set channels and profile to the resolved dependencies from the router
		var channels = channelsCtrl.channels;
		var profile = channelsCtrl.profile;

		// Set getDisplayName and getGravatar to the respective functions on the Users service.
		channelsCtrl.getDisplayName = Users.getDisplayName;
		channelsCtrl.getGravatar = User.getGravatar;

		// Create a logout function that will allow our users to log out, 
		//returning them to the home state.

		channelsCtrl.logout = function(){
			console.log('User has been logged out from channelsCtrl.logout()');

			//un-authenticate the user
			Auth.$unauth();
			$state.go('home');
		}

		//Add a newChannel object on ChannelsCtrl with a blank name
>>>>>>> channels_branch
		channelsCtrl.newChannel = {
			name: ''
		};

<<<<<<< HEAD
		channelsCtrl.createChannel = function(){
			//the $add function on $firebaseArray provides similar functionality to .push() on Array
			//but keeps the data on sync with firebase
			channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
				//once new channel is created, we clear out the newChannel object
=======
		//Create a createChannel function on ChannelsCtrl.
		channelsCtrl.createChannel = function(name){

			//the $add() function on $firebaseArray has similar functionality as .push() on an array
			channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){
>>>>>>> channels_branch
				channelsCtrl.newChannel = {
					name: ''
				};
			});
<<<<<<< HEAD
		};
=======
		}
>>>>>>> channels_branch
	});
angular.module('angularfireSlackApp').
	controller('MessagesCtrl', function(profile, channelName, messages){
		var messagesCtrl = this;

		//Set messages and channelName on messagesCtrl to the respective dependencies
		//these dependencies are the dependencies from the Resolve map of dependencies on channel.messages state
		
		//note that "messages" resolve method returns Messages.channels... which is a firebaseArray containing 
		//the messages for a certain channel chosen my the params on /{channelId}}/messages

		messagesCtrl.messages = messages;
		messagesCtrl.channelName = channelName;




		// Set message on messagesCtrl to an empty string.
		messagesCtrl.message = '';

		// Create a function sendMessage to $add a message to messages.
		messagesCtrl.sendMessage = function(){

			if (messagesCtrl.message.length > 0){

				//since messagecCtrl.messages is a $firebaseArray, we use $add() to add a message 
				//to the local and remote $firebaseArray (so it is synced with Firebase)
				messagesCtrl.messages.$add({
					//a message object will need to contain an UID to identify WHO sent the message
					uid: profile.$id,
					//body contains the text of the message
					body: messagesCtrl.message,
					timestamp: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					//when the save is completed, we want to clear out messageCtrl.message 
					//so user can type a new message
					messagesCtrl.message = '';
				});
			}
		}
	});
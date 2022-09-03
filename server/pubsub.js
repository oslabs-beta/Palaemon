/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
var subscriptionNameOrId = 'projects/guestbook-tutorial-361218/subscriptions/kubernetes-event-logs';
var timeout = 60;
// Imports the Google Cloud client library
var PubSub = require('@google-cloud/pubsub').PubSub;
// Creates a client; cache this for further use
var pubSubClient = new PubSub();
function listenForMessages() {
    // References an existing subscription
    var subscription = pubSubClient.subscription(subscriptionNameOrId);
    // Create an event handler to handle messages
    var messageCount = 0;
    var messageHandler = function (message) {
        console.log("Received message ".concat(message.id, ":"));
        console.log("\tData: ".concat(message.data));
        console.log("\tAttributes: ".concat(message.attributes));
        messageCount += 1;
        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };
    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
    setTimeout(function () {
        subscription.removeListener('message', messageHandler);
        console.log("".concat(messageCount, " message(s) received."));
    }, timeout * 1000);
}
listenForMessages();

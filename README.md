# Palaemon

- A gentle, euthanization and diagnosis tool for out-of-memory (OOM) kubernetes pods. 
- Palaemon is a Greek, childe sea-god who came to aid sailors in distress. He was often depicted as riding a dolphin. Also, a genus of shrimp.

## To run the Electron App
`npm start` will compile the app into the /dist folder and run the electron app.

## Pub Sub listening (WIP)
### What is working?
Currently there is a `server/pubsub.ts` file that is based off of Google's Pub/Sub tutorials: https://cloud.google.com/pubsub/docs/publish-receive-messages-client-library

This required `npm install --save-dev @google-cloud/pubsub`

The current `pubsub.ts` file is set up to listen to the subscription OOM-event logs that is configured on the Google Cloud dashboard of the project. 

To run the file, first compile the ts by `tsc server/pubsub.ts`
Then in the `pubsub.js` file that has been created, right-click and run the code. Current pub/sub logs should be displayed in the console log. 

### What is NOT working?
`server/pubsub.ts` is a separate file that is not connected to any other files on the electron app. 

I have no idea how authentication is working for accessing subscriptions. Potential security issues!

We should find a way to make this modular, and not based on a fixed subscription name. Have a way for the user to input their project info, and pull up subscriptions based on it. (google-cloud/pubsub also has sample code to create a new subscription, delete subscription etc).

We need to parse the data that is coming in, save it (database?) and display it. 


## How to Connect to Google Kubernetes Engine

1. Install gcloud CLI on your local machine : https://cloud.google.com/sdk/docs/install
  - If you have having problems with the gcloud CLI, try using `curl https://sdk.cloud.google.com | bash`, and make sure to update your $PATH
  - If you are still having issues, trying restarting your terminal.
2. Initialize the gcloud CLI : https://cloud.google.com/sdk/docs/initializing
3. Connect your gcloud CLI to your GKE cluster here : https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
4. Follow the steps here to deploy the Prometheus UI, and you can forward the prometheus UI to local port 9090 : https://cloud.google.com/stackdriver/docs/managed-prometheus/query

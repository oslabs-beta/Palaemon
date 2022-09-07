# Palaemon

- A gentle, euthanization and diagnosis tool for out-of-memory (OOM) kubernetes pods. 
- Palaemon is a Greek, childe sea-god who came to aid sailors in distress. He was often depicted as riding a dolphin. Also, a genus of shrimp.

## To run the Electron App
`npm start:dev` will start a webpack dev server on port 8080, creating a web browser on localhost:8080 that can be shared using VS Code's live share. It will also start the electron app, but the app usually needs to be reloaded (CMD/Ctrl + R). 
As the files will be bundled through webpack dev server, it will NOT create a /dist folder. 
(Currently, the script is a little wonky on starting the electron app as the electron app will call and open up localhost:8080 directly instead of opening from main.js)

`npm start:production` will build and bundle files into /dist folder for production and open the electron app based on the bundled files from /dist. 

`npm start` is a hybrid, butcher-ed, deprecated(?) method of starting the app. It will build a /dist folder, open the webpack-dev-server at port 8080, and open the electron app based on the files in the /dist folder. 
## How to Connect to Google Kubernetes Engine

1. Install gcloud CLI on your local machine : https://cloud.google.com/sdk/docs/install
  - If you have having problems with the gcloud CLI, try using `curl https://sdk.cloud.google.com | bash`, and make sure to update your $PATH
  - If you are still having issues, trying restarting your terminal.
2. Initialize the gcloud CLI : https://cloud.google.com/sdk/docs/initializing
3. Connect your gcloud CLI to your GKE cluster here : https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
4. Follow the steps here to deploy the Prometheus UI, and you can forward the prometheus UI to local port 9090 : https://cloud.google.com/stackdriver/docs/managed-prometheus/query

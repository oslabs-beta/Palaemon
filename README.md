<!-- ![Palaemon Logo](./client/assets/logo.png) -->
<p align="center">
  <img src="./client/assets/logo.png" alt="drawing" width="400"/>
</p>

# Palaemon

- A gentle, euthanization and diagnosis tool for out-of-memory (OOM) kubernetes pods. 
- Palaemon is a Greek, child sea-god who came to aid sailors in distress. He was often depicted as riding a dolphin. Also, a genus of shrimp.

## Getting Started

<!-- ## To run the Electron App -->
<!-- `npm start:dev` will start a webpack dev server on port 8080, creating a web browser on localhost:8080 that can be shared using VS Code's live share. It will also start the electron app, but the app usually needs to be reloaded (CMD/Ctrl + R). 
As the files will be bundled through webpack dev server, it will NOT create a /dist folder. 
(Currently, the script is a little wonky on starting the electron app as the electron app will call and open up localhost:8080 directly instead of opening from main.js) -->

<!-- `npm start:production` will build and bundle files into /dist folder for production and open the electron app based on the bundled files from /dist.  -->

1. Make sure a Prometheus pod is installed onto your node/cluster, and forward its port (default 9090) to your localhost
```
kubectl port-forward -n monitoring service/operator-kube-prometheus-s-prometheus 9090
```

  - The -n flag indicates the namespace that the pod is assigned to.
  - A list of all available services can be found through typing 
```
kubectl get services -A
```
  in the terminal. Find the service with a 9090/TCP Port assigned, and forward that service to your local 9090.
    
2. Install all dependancies using `npm install`

3. Launch the app using `npm start`

## Features

* Realtime Pod memory usage, sorted by namespaces



<!-- is a hybrid, butcher-ed, deprecated(?) method of starting the app. It will build a /dist folder, open the webpack-dev-server at port 8080, and open the electron app based on the files in the /dist folder.  -->
## How to Connect to Google Kubernetes Engine

1. Install gcloud CLI on your local machine : https://cloud.google.com/sdk/docs/install
  - If you have having problems with the gcloud CLI, try using the command below and make sure to update your $PATH
```
curl https://sdk.cloud.google.com | bash
```
  - If you are still having issues, trying restarting your terminal.
2. Initialize the gcloud CLI : https://cloud.google.com/sdk/docs/initializing
3. Connect your gcloud CLI to your GKE cluster here : https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
4. Follow the steps here to deploy the Prometheus UI, and you can forward the prometheus UI to local port 9090 : https://cloud.google.com/stackdriver/docs/managed-prometheus/query


## In Progress Features

1. Populate the remaining in-progress features.

## Built With

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Jest](https://jestjs.io/)
- [Node](https://nodejs.org/)
- [Prometheus](https://prometheus.io/)
- [Chart.js](https://www.chartjs.org/)
<!-- - [Kubernetes-client](https://github.com/kubernetes-client/) -->

## The Team
- Captain Si Young Mah [Github](https://github.com/siyoungmah) [LinkedIn](https://www.linkedin.com/in/siyoungmah/)
- Patrick Hu [Github](https://github.com/pathu91) [LinkedIn](https://www.linkedin.com/in/patrickhu91/)
- Thang Thai [Github](https://github.com/thang-thai) [LinkedIn](https://www.linkedin.com/in/thang-thai/)
- Raivyno Lenny Sutrisno [Github](https://github.com/FrozenStove) [LinkedIn](https://www.linkedin.com/in/raivyno-sutrisno/)
# Palaemon

- A gentle, euthanization and diagnosis tool for out-of-memory (OOM) kubernetes pods. 
- Palaemon is a Greek, child sea-god who came to aid sailors in distress. He was often depicted as riding a dolphin. Also, a genus of shrimp.

## To run the Electron App
### Launching in dev mode with HMR
If this it the first time running the app, start by `npm run build` to build your initial `dist` folder. Then on a different terminal run `npm run electronmon` to start your electrn app with hot module reload. 

The build command for webpack will run webpack with the --watch flag to watch for any changes in the files, and rebuild the dist folder when any files are changed. Electronmon is watching the dist folder for any changes and will either refresh or relaunch the electron app when it detects any of the dist folder files have been changed.

After the initial build, you can now just do `npm start` which will first delete the old `dist` folder from your app, and concurrently launch the webpack to build and electronmon to wait for the new `dist` folder to be built.

### Production mode
`npm start:production` will build and bundle files into /dist folder for production and open the electron app based on the bundled files from /dist. 

## How to Connect to Google Kubernetes Engine

1. Install gcloud CLI on your local machine : https://cloud.google.com/sdk/docs/install
  - If you have having problems with the gcloud CLI, try using `curl https://sdk.cloud.google.com | bash`, and make sure to update your $PATH
  - If you are still having issues, trying restarting your terminal.
2. Initialize the gcloud CLI : https://cloud.google.com/sdk/docs/initializing
3. Connect your gcloud CLI to your GKE cluster here : https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
4. Follow the steps here to deploy the Prometheus UI, and you can forward the prometheus UI to local port 9090 : https://cloud.google.com/stackdriver/docs/managed-prometheus/query

## How to Run Tests
### Unit and Integration tests using Jest
`npm run test:watch` will start the jest test suite with the `--watch` flag enabled, which allows for immediate retests upon save. The jest config in `jest.config.js` is set up to only look for and run test files within the `__test__` folder and with file names that include ".test." in them, such as "Events.test.tsx". 

Units tests are set up using Jest testing suite and react-testing-library to test react components in the front end. 

### End-to-End testing with Playwright Test Runner
`npm run test:e2e` will execute the playwright test runner and run any test files in the `__test__` folder with the name format ".e2e." in them, such as "playwright.e2e.ts". 

There are settings to enable HTML report and video, snapshot, trace recordings that can be configured in the `playwright.config.ts` file is fo desired. 


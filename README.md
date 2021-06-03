# watchyoursteps application

## How to run
Make sure to run `npm install` to install the dependencies. 

### `running on an express server`
You will need to use this option if you want to develop changes that communicates with the database. For this you need to generate
a vcap-local.json file. \
\
To use the express server, run `npm run build` to build the project*, then run `node server/server.js` to start the express server. The express server will serve objects from the [build/](build/) directory (which will get generated when you build the project). \
\
\* *This is needed since the express server is supposed to be used in deployment, i.e. built for production.*

### `run the app in development mode`
Run `npm start` to start the app in development mode. Running in development mode will not allow the application to communicate with the backend, for this you need to follow the step above "*running on an express server*".



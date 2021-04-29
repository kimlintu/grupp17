const { cloudant } = require('./db/db_init.js');

const express = require('express');
const app = express();
const path = require('path');
const cfenv = require('cfenv'); // Cloud Foundry environment (port, ip etc.)
//const cloudant = require('@cloudant/cloudant/types');

const servePath = path.join(__dirname, '../build');


const current_database = 'kimpossible_test'; //current database
const user = 'kim'; //current user
const { addDevice } = require('./iot/iot')


/* Makes it so that all files get served from the build/ directory */
/* which gets created after running npm run build. */
app.use(express.static(servePath));

app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile(path.join(servePath, 'index.html'));
});


app.get('/steps', (request, response) => {
    console.log("steps");
    cloudant.use(current_database).get(user).then((data) => {
        response.json(data.steps);
        console.log("got data: ", data.steps);
    })
});






app.post('/step-counters/add', async (request, response) => {
    try {
        const addedDevice = await addDevice({ user: 'null', deviceName: request.body.deviceName });

        const deviceInfo = {
            deviceToken: addedDevice.authToken
        };

        response.json(deviceInfo);
    } catch (error) {
        response.sendStatus(error.status)
    }
})


/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc., for the website. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(port = (app_env.port || 4096), () => {
    console.log(`listening on port ${port}`)
})
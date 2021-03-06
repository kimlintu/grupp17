const { cloudant } = require('./db/db_init.js');

const express = require('express');
const session = require('express-session')
const passport = require('passport');
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;

const app = express();

app.use(express.json());;

// app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));

const path = require('path');
const cfenv = require('cfenv'); // Cloud Foundry environment (port, ip etc.)

const servePath = path.join(__dirname, '../build');

const current_database = 'kimpossible_test'; //current database
const { addDevice, getDeviceList, deleteDevice } = require('./iot/iot')
const { getStepsForUser, getUserDevices, createDocForNewUser } = require('./db/db_functions')

app.get('/', async (request, response) => {
    if (request.user) {
        const check = await createDocForNewUser(current_database, request.user.identities[0]['id'], request.user.name);
    }

    response.sendFile(path.join(servePath, 'index.html'));
});

/************************  AUTH  *****************************************/

app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new WebAppStrategy({
    tenantId: process.env.auth_tenantId,
    clientId: process.env.auth_clientId,
    secret: process.env.auth_secret,
    oAuthServerUrl: process.env.auth_oAuthServerUrl,
    redirectUri: process.env.auth_redirectUri
}))

app.get('/account/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/',
    forceLogin: true
}));

app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/account/logout', function (req, res) {
    WebAppStrategy.logout(req);
    res.redirect('/');
})

app.get("/account/change_details", passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/',
    show: WebAppStrategy.CHANGE_DETAILS
}))

app.get('/account/sign_up', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/',
    show: WebAppStrategy.SIGN_UP
}));

app.get('/api/user', (request, response) => {
    if (request.user)
        response.json(request.user);
    else
        response.json({ name: null });
});

/************************************************************************/

/************************  IOT  ******************************************/

app.get('/step-counters/get', async (request, response) => {
    if (request.user) {
        try {
            const userId = request.user.identities[0]['id'];

            // First we need to check what devices that has been added by the user.
            const deviceId = await getUserDevices({ user: { id: userId } });

            let deviceList;
            if (deviceId !== "") {
                console.log('found!')
                deviceList = await getDeviceList({ deviceId });
            }
            else {
                console.log('NOT FOUND')
                deviceList = { results: [] };
            }

            response.json(deviceList);
        } catch (error) {
            response.sendStatus(error.status)
        }
    }
})

app.post('/step-counters/add', async (request, response) => {
    try {
        const userId = request.user.identities[0]['id'];
        const userName = request.user.name;

        const addedDevice = await addDevice({ user: { id: userId, name: userName }, deviceName: request.body.deviceName, deviceAuthToken: request.body.deviceToken });

        const deviceInfo = {
            deviceToken: addedDevice.authToken
        };

        response.json(deviceInfo);
    } catch (error) {
        console.log(error)
        response.sendStatus(error.status)
    }
});

app.delete('/step-counters/delete', async (request, response) => {
    try {
        const userId = request.user.identities[0]['id'];

        const deviceToDeleteId = request.query.deviceId;
        await deleteDevice({ user: { id: userId }, deviceId: deviceToDeleteId });

        response.sendStatus(200);
    } catch (error) {
        response.sendStatus(error.status)
    }
});

/************************************************************************/

/************************  DATABASE  ************************************/

app.get('/steps/get', async (request, response) => {
    const start_date_year = request.query.start_date_year;
    const start_date_month = request.query.start_date_month;
    const start_date_day = request.query.start_date_day;
    const stop_date_year = request.query.stop_date_year;
    const stop_date_month = request.query.stop_date_month;
    const stop_date_day = request.query.stop_date_day;

    const deviceId = request.query.deviceId;

    const start_date = {
        year: start_date_year,
        month: start_date_month,
        day: start_date_day
    }

    const stop_date = {
        year: stop_date_year,
        month: stop_date_month,
        day: stop_date_day
    }

    const stepsData = await getStepsForUser({ deviceId: deviceId, start_date, stop_date });

    response.json({ stepsResult: stepsData });
})

//Delete a document with current users id
app.get('/db/delete', (request, response) => {
    try {
        cloudant.use(current_database).get(request.user.identities[0]['id']).then((data) => {
            cloudant.use(current_database).destroy(request.user.identities[0]['id'], data._rev).then((data2) => {
                response.json(data2);
            })
        })
    } catch (error) {
        response.sendStatus(error.status);
    }

})

/************************************************************************/

/************************  SERVER  **************************************/

/* Makes it so that all files get served from the build/ directory */
/* which gets created after running npm run build. */
app.use(express.static(servePath));

/* Redirect any 404 to start page */
app.use((request, response, next) => {
    response.sendFile(path.join(servePath, 'index.html'));
})

/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc., for the website. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(port = (app_env.port || 4096), () => {
    console.log(`listening on port ${port}`)
})

/************************************************************************/

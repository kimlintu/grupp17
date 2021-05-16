const { cloudant } = require('./db/db_init.js');

const express = require('express');
const session = require('express-session')
const passport = require('passport');
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;
const cors = require('cors');

const app = express();

app.use(cors())

app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
 cb(null, user);
 });
passport.deserializeUser(function(obj, cb) {
 cb(null, obj);
 });

passport.use(new WebAppStrategy({
    tenantId: "33e5e308-d5bb-420f-ad88-a2cafe836c67",
    clientId: "bb4220c0-67a1-4451-b069-9565827b39e9",
    secret: "Y2MxYzZjYzQtZjRkOC00NGE1LTg3ZjktNDc2YjA4N2RiZjky",
    oAuthServerUrl: "https://eu-gb.appid.cloud.ibm.com/oauth/v4/33e5e308-d5bb-420f-ad88-a2cafe836c67",
    redirectUri: "http://localhost:6001/appid/callback"
    }))


app.get('/account/login', cors(), passport.authenticate(WebAppStrategy.STRATEGY_NAME,{
    successRedirect: '/',
    forceLogin: true
}));

app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));


app.get('/account/logout', function(req,res){
    WebAppStrategy.logout(req);
    res.redirect('/');
})



//app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));

//app.use(express.static('./public'));


const path = require('path');
const cfenv = require('cfenv'); // Cloud Foundry environment (port, ip etc.)
//const cloudant = require('@cloudant/cloudant/types');

const servePath = path.join(__dirname, '../build');


const current_database = 'kimpossible_test'; //current database
//const user = 'kim'; //current user
const { addDevice, getDeviceList } = require('./iot/iot')
/*
app.get('/', async (request, response) => {
    try{
        const checkDb = await cloudant.use(current_database).get(request.user.identities[0]['id']);
        //console.log(checkDb);
        } catch (e){
            const create = await cloudant.use(current_database).insert({steps: 0, device_id: ''}, 
                request.user.identities[0]['id']);
            //console.error(e);
        }
    
    response.sendFile(path.join(servePath, 'index.html'));
});

/* Makes it so that all files get served from the build/ directory */
/* which gets created after running npm run build. */
app.use(express.static(servePath));

app.use(express.json());



app.get('/api/user', (request, response) =>{
    response.json(request.user);
});

app.get('/steps', (request, response) => {
    cloudant.use(current_database).get(request.user.identities[0]['id']).then((data) => {
        response.json(data.steps);
    })
});
//Delete a document with current users id
app.get('/db/delete', (request, response) =>{
    try{
        cloudant.use(current_database).get(request.user.identities[0]['id']).then((data) => {
            cloudant.use(current_database).destroy(request.user.identities[0]['id'], data._rev).then((data2) => {
                response.json(data2);
            })
        })
    }catch(error){
        response.sendStatus(error.status);
    }
    
})

app.get('/step-counters/get', async (request, response) => {
    try {
        const deviceList = await getDeviceList({ user: { name: 'test-user' }});
        
        response.json(deviceList);
    } catch (error) {
        response.sendStatus(error.status)
    }
})

app.post('/step-counters/add', async (request, response) => {
    try {
        const addedDevice = await addDevice({ user: { name: 'test-user' }, deviceName: request.body.deviceName, deviceAuthToken: request.body.deviceToken });

        const deviceInfo = {
            deviceToken: addedDevice.authToken
        };

        response.json(deviceInfo);
    } catch (error) {
        response.sendStatus(error.status)
    }
});

app.post('/steps/add', (request, response) => {
    cloudant.use(current_database).get(request.user.identities[0]['id']).then((data) =>{
        const doc = data;
        cloudant.use(current_database).insert({_rev: doc._rev,
             steps: request.body.numberOfSteps,
             name: request.user.name}, 
             request.user.identities[0]['id']);
    })
})

/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc., for the website. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(port = (app_env.port || 4096), () => {
    console.log(`listening on port ${port}`)
})

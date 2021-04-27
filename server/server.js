const { cloudant } = require('./db/db_init.js');

const express = require('express');
const app = express();
const path = require('path');
const cfenv = require('cfenv') // Cloud Foundry environment (port, ip etc.)

const servePath = path.join(__dirname, '../build');

/* Makes it so that all files get served from the build/ directory */
/* which gets created after running npm run build. */
app.use(express.static(servePath));

app.get('/', (request, response) => {
    response.sendFile(path.join(servePath, 'index.html'));
});
//use specified DB, insert value and id of inserter
cloudant.use('kimpossible_test').insert({dog: true, happy: false, _rev: "2-7e5c9fcdd9864f1a83d760a3dd7a76e6"}, 'kim');

//create a DB using promises, then write
/*cloudant.db.use('kimpossible_test').then(() => {
    cloudant.use('kimpossible_test').insert({happy: true}, 'nikita').then((data) => {
        console.log(data);
    });
}).catch((err) => {
    console.log(err);
});*/

/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc., for the website. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(port = (app_env.port || 4096), () => {
    console.log(`listening on port ${port}`)
})
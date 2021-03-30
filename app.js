/* SERVER */

const express = require('express');
const app = express();
const path = require('path');
const cfenv = require('cfenv') // Cloud Foundry environment (port, ip etc.)

const servePath = path.join(__dirname, 'build');

app.use(express.static(servePath));

app.get('/', (request, response) => {
    response.sendFile(path.join(servePath, 'index.html'));
});

/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(app_env.port || 4096, () => {})
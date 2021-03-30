const express = require('express');
const app = express();
const path = require('path');
const cfenv = require('cfenv') // Cloud Foundry environment (port, ip etc.)

const servePath = path.join(__dirname, 'build');

/* Makes it so that all files get served from the build/ directory */
/* which gets created after running npm run build. */
app.use(express.static(servePath));

app.get('/', (request, response) => {
    response.sendFile(path.join(servePath, 'index.html'));
});

/* Environment for Cloud Foundry app (watchyoursteps). Contains things such as 
   application port, connected services etc., for the website. */
const app_env = cfenv.getAppEnv({ vcapFile: 'vcap-local.json' });

app.listen(port = (app_env.port || 4096), () => {
    console.log(`listening on port ${port}`)
})
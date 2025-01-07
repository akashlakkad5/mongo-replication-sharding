process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
}).on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

require('dotenv').config();


const dbOps = require('./loaders/mongoose');

Promise.all([dbOps.connect(),]).then(async () => {
    global.masterDB = await dbOps.switchDB({ dbName: process.env.MASTER_DB_NAME });
    require('./loaders/express');
    console.log('All loaders have been initialized');
}).catch(err => {
    console.error('Error initializing loaders:', err);
    return process.exit(1);
});

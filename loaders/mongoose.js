const mongoose = require("mongoose");

let dbConnections = [];

exports.connect = async () => {
    try {
        global.dbConnection = await mongoose.connect(process.env.MONGODB_URI + `/${process.env.MASTER_DB_NAME}`, {
            family: 4
        });
        console.log('Connected to MongoDB', new Date());
    } catch (err) {
        console.log("[ERROR] [DATABASE CONNECTION] -> ", err, new Date());
        throw err;
    }
};

exports.switchDB = async ({dbName = process.env.MASTER_DB_NAME}) => {
    try {
        if (dbConnections[dbName]) {
            return dbConnections[dbName];
        }
        const newDB = await mongoose.connection.useDb(dbName, { useCache: true });
        dbConnections[dbName] = newDB;
        return newDB;
    } catch (err) {
        console.log("[ERROR] [SWITCH] [DATABASE SWITCH] -> ", err);
        throw err;
    }
};
const { constant } = require("../../utils");


exports.createUser = async (req) => new Promise((resolve, reject) => {
    try {
        const { name, email, password, role } = req.body;

        const checkExisttance = () => new Promise(async (resolve, reject) => {
            try {
                const user = await Mongo.findOne({
                    db: masterDB, collection: constant.COLLECTION.USERS, query: { email },
                });
                if (user) return reject({
                    code: 400,
                    error: "User already exists",
                });
                return resolve();
            } catch (error) {
                console.log("[ERROR] [CHECK_EXISTANCE]", error);
                return reject(error);
            }
        })

        const createUser = () => new Promise(async (resolve, reject) => {
            try {
                const user = await Mongo.insertOne({
                    db: masterDB, collection: constant.COLLECTION.USERS, document: { name, email, password, role },
                });
                return resolve(user);
            } catch (error) {
                console.log("[ERROR] [CREATE_USER]", error);
                return reject(error);
            }
        })

        checkExisttance()
            .then(() => createUser())
            .then((user) => resolve(user))
            .catch((error) => reject(error));

    } catch (error) {
        console.log("[ERROR] [CREATE_USER]", error);
        return reject(error);
    }
})

exports.userLogin = async (req) => new Promise((resolve, reject) => {
    try {
        const { email, password } = req.body;

        const checkUser = () => new Promise(async (resolve, reject) => {
            try {
                const user = await Mongo.findOne({
                    db: masterDB, collection: constant.COLLECTION.USERS, query: { email },
                });
                if (!user) return reject({
                    code: 400,
                    error: "User not found",
                });
                return resolve(user);
            } catch (error) {
                console.log("[ERROR] [CHECK_USER]", error);
                return reject(error);
            }
        })

        const checkPassword = () => new Promise(async (resolve, reject) => {
            try {
                const user = await Mongo.findOne({
                    db: masterDB, collection: constant.COLLECTION.USERS, query: { email, password },
                });
                if (!user) return reject({
                    code: 400,
                    error: "User not found",
                });
                return resolve(user);
            } catch (error) {
                console.log("[ERROR] [CHECK_PASSWORD]", error);
                return reject(error);
            }
        })

        checkUser()
            .then((user) => checkPassword(user))
            .then((user) => resolve(user))
            .catch((error) => reject(error));

    } catch (error) {
        console.log("[ERROR] [USER_LOGIN]", error);
        return reject(error);
    }
})

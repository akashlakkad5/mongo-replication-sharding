exports.sendResponse = (res, status, data) => {
    res.status(status).json({
        error: status != 200,
        status,
        data: { ...data, sentDate: new Date() },
    });
}

exports.apiHandler = ({ payload, handler }) => (req, res, next) => {
    // validate payload
    const validatePayload = () => new Promise((resolve, reject) => {
        try {
            if (!payload) return resolve();
            const { error } = payload.validate(req.body);
            if (error) return reject({
                code: 400,
                error: error?.details[0]?.message,
            });
            return resolve(req.body);
        } catch (error) {
            console.log("[ERROR] [VALIDATE_PAYLOAD]", error);
            return reject(error);
        }
    })

    // handle request
    const processHnadler = () => new Promise((resolve, reject) => {
        try {
            handler(req, res).then(resolve).catch(reject);
        } catch (error) {
            console.log("[ERROR] [PROCESS_HANDLER]", error);
            return reject(error);
        }
    })

    validatePayload().then(processHnadler).then((data) => {
        return this.sendResponse(res, 200, data);
    }).catch(err => {
        console.log("[ERROR] [PATH]", req.originalUrl, err, JSON.stringify(req.body));
        if (err?.code && err?.error) return this.sendResponse(res, err.code, {...err});
        return this.sendResponse(res, 500, { message: "Internal server error" });
    });
}


const mcache = require('memory-cache');

const applyCache = (duration, key) => {
    return (req, res, next) => {
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return;
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next();
        }
    }
}

module.exports = {
    applyCache: applyCache
};

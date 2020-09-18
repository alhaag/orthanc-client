const superagent = require('superagent');

module.exports = request;

function request(options) {

    const method = options.method || 'get';
    const headers = options.headers;
    const params = options.params;
    const auth = options.auth;

    return superagent
        [method](options.url)
        .query(params)
        .use(req => {
            // conditional auth (Basic Auth)
            if (auth) req.auth(auth.user, auth.pass)
            // add headers
            if (headers) req.set(headers)
        })
        .timeout({
            response: 3 * 60 * 1000, // Wait 3 minutes for the server to start sending.
            deadline: 3 * 60 * 1000, // but allow 3 minute for the file to finish loading.
        });
}

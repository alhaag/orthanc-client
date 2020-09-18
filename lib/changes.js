const request = require('./request');

/**
 * @namespace
 * @private
 */
const Changes = {
    /**
     * Get changes logs
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @param {Object} [params] last, "limit" and "since" arguments
     * @param {Boolean} [params.last=false] Specify whether or not only the last change should be returned
     * @param {Integer} [params.since=0] Set the sequence number since which changes should be returned
     * @param {Integer} [params.limit=100] Set the returned changes limit. Default and maximum values are the same : 100
     * @returns {Promise} The expected response is a JSON object
     */
    getChanges: function(client, params) {
        return new Promise((resolve, reject) => {
            if(params === undefined) params = {};
            if(params.last === undefined || typeof params.last !== 'boolean' || params.last === false) params.last = undefined;
            if(params.last === undefined || !params.last) {
                if (params.limit === undefined || typeof params.limit !== 'number') params.limit = 0;
                if (params.since === undefined || typeof params.since !== 'number') params.since = undefined;
            }
            request({
                url: client.url + '/changes',
                headers: client.headers,
                params: Object.assign(params, client.params),
                auth: client.auth
            })
                .then(res => resolve(res.body))
                .catch(reject)

            /*request
                .get({
                    url: client.url + '/changes',
                    qs: params,
                    auth: client.auth
                },
                function(error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else if (response.statusCode != 200) {
                        reject(new Error(response.statusCode + " " + response.statusMessage));
                    }
                    else {
                        resolve(JSON.parse(body));
                    }
                });*/
        });
    },
    /**
     * Delete changes logs
     * @private
     * @param {Client} client Client which will be used to perform the request
     * @returns {Promise} The expected response is empty
     */
    deleteChanges: function(client) {
        return new Promise((resolve, reject) => {
            request({
                method: 'delete',
                url: client.url + '/changes',
                headers: client.headers,
                params: client.params,
                auth: client.auth
            })
                .then(() => resolve())
                .catch(reject)
            /*request
                .del({
                    url: client.url + '/changes',
                    auth: client.auth
                },
                function(error, response, body) {
                    if (error) {
                        reject(error);
                    }
                    else if (response.statusCode != 200) {
                        reject(new Error(response.statusCode + " " + response.statusMessage));
                    }
                    else {
                        resolve(body);
                    }
                });*/
        });
    }
};

module.exports = Changes;
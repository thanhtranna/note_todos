var configValues = require("./config");

module.exports = {
    getDBConnectionString: function() {
        return `mongodb://${ configValues.username }:${ configValues.password }@ds157278.mlab.com:57278/nodejs_todos`;
    }
};
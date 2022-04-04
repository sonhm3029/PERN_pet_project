const path = require("path");

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias :{
            "@src": path.resolve(__dirname, "src"),
            "@context":path.resolve(__dirname, "src/Context"),
        }
    }
    return config;
}

const path = require("path");

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@views": path.resolve(__dirname, "src/views"),
            "@context": path.resolve(__dirname, "src/context"),
            "@data-access": path.resolve(__dirname, "src/data-access"),
            "@utils": path.resolve(__dirname, "src/utils")
        },
    }
    return config;
}
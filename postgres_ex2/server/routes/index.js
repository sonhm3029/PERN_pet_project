const auth = require("./auth");
const dashboard= require("./dashboard");
const validAuth = require("../middleware/validAuth");

module.exports =  function route(app) {
    app.use("/auth", auth);
    app.use("/dashboard",validAuth,dashboard);
}
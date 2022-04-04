const home = require('./home');
const restaurants = require("./restaurant");

module.exports =  function route(app) {
    app.get("/", (req, res, next)=> {
        res.send("Hello world!");
    })
    app.use("/home", home);
    app.use("/restaurants", restaurants);
}
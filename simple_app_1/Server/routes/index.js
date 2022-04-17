const home = require('./home');
const restaurants = require("./restaurant");
const reviews = require("./reviews");

const prefix = "/api/v1";

module.exports =  function route(app) {
    app.get(prefix + "/", (req, res, next)=> {
        res.send("Hello world!");
    })
    app.use(prefix+"/home", home);
    app.use(prefix+"/restaurants", restaurants);
    app.use(prefix +"/reviews", reviews );
}
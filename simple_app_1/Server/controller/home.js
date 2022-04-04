const db = require("../database");

class HomeController {

    async getHome(req, res, next) {
        const data = await db.query("SELECT * FROM restaurants");
        res.json(data);
    }

};

module.exports = new HomeController;

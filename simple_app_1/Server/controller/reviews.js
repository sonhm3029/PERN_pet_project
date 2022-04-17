const db = require("../database");

class ReviewController {

    async addReview(req, res, next) {
        try {
            const {restaurant_id, name, review, rating} = req?.body;
            const response = await db.query(
                `INSERT INTO reviews(restaurant_id, name, review, rating) `+
                `VALUES($1, $2, $3, $4) returning *`,
                [restaurant_id, name, review, rating]
            );
            res.status(200).json({
                status:"success",
                data: response?.rows[0]
            });
        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            });
        }
    }

    async getReviews(req, res, next) {
        try {
            var query = "$1";
            if(req?.query?.restaurant_id) {
                query = `restaurant_id = `+query;
            }
            console.log(`SELECT * FROM reviews `+
            `WHERE true AND ${query}`)
            const response = await db.query(
                `SELECT * FROM reviews `+
                `WHERE true AND ${query}`,
                [(req?.query?.restaurant_id||"true")]
            );
            res.status(200).json({
                status:"success",
                data: response?.rows
            });
        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            });
        }
    }

}

module.exports = new ReviewController;

const db = require("../database");

class RestaurantController {

    async getRestaurants(req, res, next) {
        try {
            const response =
                await db.query(
                    `SELECT * FROM restaurants AS RES `+
                    `LEFT JOIN `+
                    `(SELECT `+
                        `TRUNC(AVG(rating),1) AS rating, `+
                        `COUNT(restaurant_id) AS num_rating, `+
                        `restaurant_id `+
                    `FROM reviews GROUP BY restaurant_id) AS REV `+
                    `ON RES.id = REV.restaurant_id`
                );
            res.status(200).json({
                status:"success",
                data:response.rows,
            });
        } catch (error) {
            res.status(500).json({
                status:"Error",
                message: error?.message,
            })
        }
    }

    async getRestaurantDetail(req, res, next) {
        try {
            const response = await db.query(
                `SELECT * FROM restaurants `+
                `WHERE id = $1`,
                [req?.params?.id]
            );
            res.status(200).json({
                status:"Success",
                data: response?.rows[0],
            })
        } catch (error) {
            res.status(401).json({
                status:"Error",
                message: error?.message,
            })
        }
    }

    async createRestaurant(req, res, next) {
        try {
            const {name, location, price_range} = req?.body;
            const response = await db.query(
                `INSERT INTO restaurants (name, location, price_range) `+
                `VALUES ($1, $2, $3) RETURNING *`,
                [name, location, price_range]
            );

            res.status(200).json({
                status:"success",
                data: response?.rows[0]
            })
        } catch (error) {
            res.status(401).json({
                status:"Error",
                message: error?.message,
            })
        }
    }

    async updateRestaurant(req, res, next) {
        try {
            const {name, location, price_range} = req?.body;
            const id = req?.params?.id;

            const response = await db.query(
                `UPDATE restaurants SET `+
                `name=$1, location=$2, price_range=$3 `+
                `WHERE id=$4 RETURNING *`,
                [name, location, price_range, id]
            );

            res.status(200).json({
                status:"success",
                data: response?.rows[0]
            })
        } catch (error) {
            res.status(401).json({
                status:"Error",
                message: error?.message,
            })
        }
    }

    async deleteRestaurant(req, res, next) {
        try {
            const id = req?.params?.id;

            const response = await db.query(
                `DELETE FROM restaurants `+
                `WHERE id=$1 RETURNING *`,
                [id]
            );

            res.status(200).json({
                status:"success",
                data: response?.rows[0]
            })
        } catch (error) {
            res.status(401).json({
                status:"Error",
                message: error?.message,
            })
        }
    }
}

module.exports = new RestaurantController;

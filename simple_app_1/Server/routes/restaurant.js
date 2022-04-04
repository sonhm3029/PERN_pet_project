const express = require("express");
const router = express.Router();
const RestaurantController = require("../controller/restaurants");

router.get("/", RestaurantController.getRestaurants)
      .post("/", RestaurantController.createRestaurant);
router.get("/:id", RestaurantController.getRestaurantDetail)
      .put("/:id", RestaurantController.updateRestaurant)
      .delete("/:id", RestaurantController.deleteRestaurant);
      

module.exports = router;

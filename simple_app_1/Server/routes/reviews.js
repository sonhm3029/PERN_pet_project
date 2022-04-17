const express = require("express");
const router = express.Router();

const ReviewController = require("../controller/reviews");

router.get("/", ReviewController.getReviews)
      .post("/", ReviewController.addReview);


module.exports = router;
const express = require("express");
const router = express();

router.get("/", (req, res)=> {
    res.send("dashboard");
});

module.exports = router;

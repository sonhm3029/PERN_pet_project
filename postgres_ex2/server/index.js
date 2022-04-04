const express = require("express");
const app = express();
const cors = require("cors");
const route = require('./routes');

const PORT=5001;

// middleware

app.use(express.json());
app.use(cors());


// ROUTES

app.get("/", (req, res) => {
    res.send("HELLo");
})
route(app);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
const express = require("express");
const morgan = require("morgan");
const app = express();
const route = require("./routes");

const port = 5000;

// Sử dụng express.json() middleware để request body được đính vào req
// Nếu không khi gửi request thì body k đc đính vào req.
app.use(express.json());
app.use(morgan("dev"))//Sử dụng morgan để inspect ra các request đến server


route(app);



app.listen(port, ()=> {
    console.log(`Server running on port ${port}!`);
})
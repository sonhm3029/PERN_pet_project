const express = require('express');
const bodyParser = require('body-parser');
const route = require('./queries');
const app = express();
const port =5000;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

app.get('/', (req, res) => {
    res.json("HELLO");
})

app.get('/users',route.getUsers)
   .get('/users/:id', route.getUserById)
   .post('/users', route.createUser)
   .put('/users/:id', route.updateUser)
   .delete('/users/:id', route.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
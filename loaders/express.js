const express = require('express');
const users = require('../routes/users');



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/users', users);

app.listen(3003, ()=> {
    console.log("App listening on port 3003")
})
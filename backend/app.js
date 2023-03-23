const express = require("express");
const app = express();
const port = process.env.PORT | 5500;
const mysql = require("mysql2");

require("./models")
var userCtrl = require('./controllers/userController')

app.get("/adduser", userCtrl.addUser);


app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

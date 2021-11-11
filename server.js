const express = require("express");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3003;

app.engine("handlebars", exphbs ({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//


app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });


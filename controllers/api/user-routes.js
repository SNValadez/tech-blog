const router = require("express").Router();

const { User } = require("../../models");

router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(dbUsDa => {
      req.session.save(() => {

        req.session.userId = dbUsDa.id;

        req.session.username = dbUsDa.username;
        req.session.loggedIn = true;
  
        res.json(dbUsDa);

      });
    })

    .catch(err => {
      console.log(err);
      
      res.status(500).json(err);
    });
  });
const router = require("express").Router();

const { User } = require("../../models");



router.post("/login", (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUsDa => {
      if (!dbUsDa) {
        res.status(400).json({ message: "Cannot find user account!" });
        return;
      }
  
      const validPassword = dbUsDa.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: "This password is incorrect!" });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = dbUsDa.id;
        req.session.username = dbUsDa.username;
        req.session.loggedIn = true;
    
        res.json({ user: dbUsDa, message: "Currently logged in!" });
      });
    });
  });
  



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

  router.delete("/user/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbUsDa => {
      if (!dbUsDa) {
        res.status(404).json({ message: "Cannot find user with this id!" });
        return;
      }
      res.json(dbUsDa);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

  module.exports = router;
const router = require("express").Router();

const { Post, 
    Comment,
     User } = require("../../models/");

const withAuth = require("../../utils/auth");


router.delete("/:id", withAuth, (req, res) => {

    Post.destroy({
            where: {
                id: req.params.id,
            },
        })

        .then((dbPoDa) => {
            if (!dbPoDa) {
                res.status(404).json({
                    message: "No post associated with this id!"
                });
                return;
            }
            res.json(dbPoDa);
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", withAuth, (req, res) => {
    console.log("initating creation");

    Post.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        
        .then((dbPoDa) => res.json(dbPoDa))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
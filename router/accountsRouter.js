const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", (req, res) => {
    db.select('*').from('accounts').then(rows => {
        res.status(200).json({ data: rows });
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry, something went wrong retrieving the data."});
    })
})

router.get("/:id", (req, res) => {
    db('accounts').where({ id: req.params.id }).first().then(accounts => {
        if (accounts) {
            res.status(200).json({ data: accounts });
        } else {
            res.status(404).json({ message: "Account could not be found"});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry, there was an error returning the data." });
    })
})



module.exports = router
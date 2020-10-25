const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

//Get Accounts
router.get("/", (req, res) => {
    db.select('*').from('accounts').then(rows => {
        res.status(200).json({ data: rows });
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry, something went wrong retrieving the data."});
    })
})

//Get Accounts by ID
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
//Post Accounts
router.post('/', (req, res) => {
    db('accounts').insert(req.body, "id").then(ids => {
        res.status(201).json({ results: ids });
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error somewhere in the code." });
    })
})



module.exports = router
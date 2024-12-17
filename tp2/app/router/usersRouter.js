const express = require("express")
const router = express.Router()
const controller = require("../controller/usersController")

// create
router.post('/users', controller.create)
// read
router.get('/users/:id', controller.id)
router.get('/users/:page/:limite', controller.index)
router.get('/users/search', controller.search)
// update
router.put('/users/:id', controller.update)
// delete
router.delete('/users/:id', controller.delete)

module.exports = router
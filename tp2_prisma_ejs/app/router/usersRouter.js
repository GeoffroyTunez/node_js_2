const express = require("express")
const router = express.Router()
const controller = require("../controller/usersController")

// create
router.post('/users', controller.create)

// delete
router.put('/users/delete/:id', controller.delete)

// read
router.get('/users/all', controller.all)
router.get('/users/search', controller.search)
router.get('/users/:page/:limite', controller.index)
router.get('/users/:id', controller.id)

// update
router.put('/users/:id', controller.update)




module.exports = router

const express = require("express")
const router = express.Router()
const controller = require("../controller/productController")

router.get("/products", controller.index)
router.get("/products/:id", controller.index)
router.post("/products",nameIsPresent, controller.create)
router.put("/products/:id", nameIsPresent,controller.update)
router.delete("/products/:id", controller.destroy)


module.exports = router
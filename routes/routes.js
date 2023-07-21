const Router = require("express").Router()

const farmaciaControllers = require("../controllers/farmaciaControllers")
const {getAllProducts, getOneProduct, addManyProducts, addOneProduct, removeManyProducts, removeProduct, modifyProduct} = farmaciaControllers

Router.route("/farmacia")
.get(getAllProducts)
.post((req, res)=>(Array.isArray(req.body.data) ?addManyProducts(req, res) :addOneProduct(req,res)))
.delete(removeManyProducts)

Router.route("/farmacia/:id")
.get(getOneProduct)
.delete(removeProduct)
.put(modifyProduct)

// Router.route("/allCities")
// .post(addAllCities)

module.exports = Router;
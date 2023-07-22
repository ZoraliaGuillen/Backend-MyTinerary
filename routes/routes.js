const Router = require("express").Router()

const citiesControllers = require("../controllers/citiesControllers")
const {getAllCities, getOneCity, addManyCities, addOneCity, removeManyCities, removeCity, modifyCity} = citiesControllers

Router.route("/cities")
.get(getAllCities)
.post((req, res)=>(Array.isArray(req.body.data) ?addManyCities(req, res) :addOneCity(req,res)))
.delete(removeManyCities)

Router.route("/cities/:id")
.get(getOneCity)
.delete(removeCity)
.put(modifyCity)

// Router.route("/allcities")
// .post(addAllCities)

module.exports = Router;
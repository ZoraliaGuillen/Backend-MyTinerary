const Cities = require("../models/citiesmodel.js")

const citiesControllers = {
    getAllCities: async (req, res) => {
        let cities
        let error = null

        try {
            cities = await Cities.find()
        } catch (err) { error = err }

        console.log(cities)
        console.log(error)
        res.json({
            response: error ? "ERROR" : { cities },
            success: error ? false : true,
            error: error
        })

    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.find({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })

    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const data = req.body.data
        let city
        let error = null

        try {
            city = await Cities.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })

    },
    addManyCities: async (req, res) => {
        let cities = []
        let error = []

        for (let city of req.body.data) {
            try {
                let verifyCityExist = await Cities.find({ name: { $regex: city.name, $options: 'i' } })
                if (verifyCityExist.length == 0) {

                    let dataCity =
                    {
                        name: city.name,
                        country: city.country,
                        continent: city.continent,
                        language: city.language,
                        description: city.description,
                        image: city.image,
                    }

                    await new Cities({
                        ...dataCity
                    }).save()
                    cities.push(dataCity)
                } else {

                    error.push({
                        name: city.name,
                        result: "La ciudad " + city.name + " ya existe en la BD con el id: " + verifyCityExist[0]._id + "ENTRO POR ADDALLCITY"
                    })
                }

            } catch (err) { error.push({ name: city.name, err }) }
        }

        res.json({
            response: error.length > 0 && cities.length === 0 ? "ERROR" : cities,
            success: error.length > 0 ? (cities.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
    addOneCity: async (req, res) => {
        const { name, country, continent, language, description, image } = req.body.data
        let city
        let error = null

        try {
            let verifyCityExist = await Cities.find({ name: { $regex: name, $options: 'i' } })
            console.log(verifyCityExist)
            if (verifyCityExist.length == 0) {
                city = await new Cities({
                    name: name,
                    country: country,
                    continent: continent,
                    language: language,
                    description: description,
                    image: image,
                }).save()
            } else {
                error = "La ciudad ya existe en la BD con el id: " + verifyCityExist[0]._id + "ENTRO POR ADDONECITY"
            }
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })

    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOneAndDelete({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : city,
            success: error ? false : true,
            error: error
        })

    },
    removeManyCities: async (req, res) => {
        const data = req.body.data
        let citiesDelete = []
        let error = []

        for (let id of data) {
            try {
                let city
                city = await Cities.findOneAndDelete({ _id: id })
                if (city) {
                    citiesDelete.push(city)
                } else {
                    error.push({
                        id: id,
                        error: "No se encontro la ciudad a eliminar"
                    })
                }


            } catch (err) { error.push({ err }) }
        }

        res.json({
            response: error.length > 0 && citiesDelete.length === 0 ? "ERROR" : citiesDelete,
            success: error.length > 0 ? (citiesDelete.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
};

module.exports = citiesControllers;
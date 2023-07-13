const Itineraries = require("../models/itinerariesmodel.js")

const itinerariesControllers = {
    getAllItineraries: async (req, res) => {
        let itineraries
        let error = null

        try {
            itineraries = await Itineraries.find()
        } catch (err) { error = err }

        console.log(itineraries)
        console.log(error)
        res.json({
            response: error ? "ERROR" : { itineraries },
            success: error ? false : true,
            error: error
        })

    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.find({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })

    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const data = req.body.data
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })

    },
    addManyItineraries: async (req, res) => {
        let itineraries = []
        let error = []

        for (let itinerary of req.body.data) {
            try {
                let verifyItineraryExist = await Itineraries.find({ nameItinerary: { $regex: itinerary.nameItinerary, $options: 'i' } })
                if (verifyItineraryExist.length == 0) {

                    let dataItinerary =
                    {
                        cityId: itinerary.cityId,
                        cityName: itinerary.cityName,
                        nameItinerary: itinerary.nameItinerary,
                        userName: itinerary.userName,
                        userPhoto: itinerary.userPhoto,
                        price: itinerary.price,
                        duration: itinerary.duration,
                        hashtags: itinerary.hashtags,
                        likes: itinerary.likes,
                    }

                    await new Itineraries({
                        ...dataItinerary
                    }).save()
                    itineraries.push(dataItinerary)
                } else {

                    error.push({
                        nameItinerary: itinerary.nameItinerary,
                        result: "El itinerario " + itinerary.nameItinerary + " ya existe en la BD con el id: " + verifyItineraryExist[0]._id + "ENTRO POR ADDALLITINERARY"
                    })
                }

            } catch (err) { error.push({ nameItinerary: itinerary.nameItinerary, err }) }
        }

        res.json({
            response: error.length > 0 && itineraries.length === 0 ? "ERROR" : itineraries,
            success: error.length > 0 ? (itineraries.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
    addOneItinerary: async (req, res) => {
        const { cityId, cityName, nameItinerary, userName, userPhoto, price, duration, hastags, likes } = req.body.data
        let itinerary
        let error = null

        try {
            let verifyItineraryExist = await Itineraries.find({ nameItinerary: { $regex: itinerary.nameItinerary, $options: 'i' } })
            console.log(verifyItineraryExist)
            if (verifyItineraryExist.length == 0) {
                itinerary = await new Itineraries({
                    cityId: cityId,
                    cityName: cityName,
                    nameItinerary: nameItinerary,
                    userName: userName,
                    userPhoto: userPhoto,
                    price: price,
                    duration: duration,
                    hastags: hastags,
                    likes: likes, 
                }).save()
            } else {
                error = "El itinerario ya existe en la BD con el id: " + verifyItineraryExist[0]._id + "ENTRO POR ADDONEITINERARY"
            }
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })

    },
    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.findOneAndDelete({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })

    },
    removeManyItineraries: async (req, res) => {
        const data = req.body.data
        let itinerariesDelete = []
        let error = []

        for (let id of data) {
            try {
                let itinerary
                itinerary = await Itineraries.findOneAndDelete({ _id: id })
                if (itinerary) {
                    itinerariesDelete.push(itinerary)
                } else {
                    error.push({
                        id: id,
                        error: "No se encontro el itinerario a eliminar"
                    })
                }


            } catch (err) { error.push({ err }) }
        }

        res.json({
            response: error.length > 0 && itinerariesDelete.length === 0 ? "ERROR" : itinerariesDelete,
            success: error.length > 0 ? (itinerariesDelete.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
};

module.exports = itinerariesControllers;





const Farmacia = require("../models/farmaciamodel.js")

const citiesControllers = {
    getAllProducts: async (req, res) => {
        let products
        let error = null

        try {
            products = await Farmacia.find()
        } catch (err) { error = err }

        console.log(products)
        console.log(error)
        res.json({
            response: error ? "ERROR" : { products },
            success: error ? false : true,
            error: error
        })

    },
    getOneProduct: async (req, res) => {
        const id = req.params.id
        let product
        let error = null

        try {
            product = await Farmacia.find({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : product,
            success: error ? false : true,
            error: error
        })

    },
    modifyProduct: async (req, res) => {
        const id = req.params.id
        const data = req.body.data
        let product
        let error = null

        try {
            product = await Farmacia.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : product,
            success: error ? false : true,
            error: error
        })

    },
    addManyProducts: async (req, res) => {
        let products = []
        let error = []

        for (let product of req.body.data) {
            try {
                let verifyProductExist = await Farmacia.find({ name: { $regex: product.producto, $options: 'i' } })
                if (verifyProductExist.length == 0) {

                    let dataProduct =
                    {
                        id: product.id,
                        categoria: product.categoria,
                        subcategoria: product.subcategoria,
                        marca: product.marca,
                        fotoMarca: product.fotoMarca,
                        producto: product.producto,
                        fotoProducto: product.fotoProducto,
                        precio: product.precio
                    }

                    await new Farmacia({
                        ...dataProduct
                    }).save()
                    products.push(dataProduct)
                } else {

                    error.push({
                        producto: product.producto,
                        result: "El producto " + product.producto + " ya existe en la BD con el id: " + verifyProductExist[0]._id + "ENTRO POR ADDALLPRODUCTS"
                    })
                }

            } catch (err) { error.push({ producto: product.producto, err }) }
        }

        res.json({
            response: error.length > 0 && products.length === 0 ? "ERROR" : products,
            success: error.length > 0 ? (products.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
    addOneProduct: async (req, res) => {
        const { id, categoria, subcategoria, marca, fotoMarca, producto, fotoProducto, precio } = req.body.data
        let product
        let error = null

        try {
            let verifyProductExist = await Farmacia.find({ producto: { $regex: producto, $options: 'i' } })
            console.log(verifyProductExist)
            if (verifyProductExist.length == 0) {
                product = await new Cities({
                    id: id,
                    categoria: categoria, 
                    subcategoria: subcategoria, 
                    marca: marca, 
                    fotoMarca: fotoMarca, 
                    producto: producto, 
                    fotoProducto: fotoProducto, 
                    precio: precio
                }).save()
            } else {
                error = "El producto ya existe en la BD con el id: " + verifyProductExist[0]._id + "ENTRO POR ADDONEPRODUCT"
            }
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : product,
            success: error ? false : true,
            error: error
        })

    },
    removeProduct: async (req, res) => {
        const id = req.params.id
        let product
        let error = null

        try {
            product = await Farmacia.findOneAndDelete({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : product,
            success: error ? false : true,
            error: error
        })

    },
    removeManyProducts: async (req, res) => {
        const data = req.body.data
        let productsDelete = []
        let error = []

        for (let id of data) {
            try {
                let product
                product = await Cities.findOneAndDelete({ _id: id })
                if (product) {
                    productsDelete.push(product)
                } else {
                    error.push({
                        id: id,
                        error: "No se encontro la ciudad a eliminar"
                    })
                }


            } catch (err) { error.push({ err }) }
        }

        res.json({
            response: error.length > 0 && productsDelete.length === 0 ? "ERROR" : productsDelete,
            success: error.length > 0 ? (productsDelete.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },
};

module.exports = citiesControllers;
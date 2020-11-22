const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const ProductController = {

    //añadir elemento
    async add(req, res) {
        try { 
            const idSeller = req.user._id; //de la validación por token obtenemos req.user._id
            if(req.body.idSellers) return res.status(400).send({message: 'The field idSellers must not be given'});  //si se ha rellenado previamente el campo idSellers, se avisa de que debe estar vacío
            
            const product = await Product.create(req.body) //se crea product
            await Product.findByIdAndUpdate(product._id, {$push: {idSellers: idSeller}}, {new: true}); //actualizamos el product con el idSeller de la validación 

                /* //También utilizando operador spread en create():
                const idSeller = req.user._id;
                const product = await Product.create({
                    ...req.body,
                    idSellers: idSeller
                });*/

                /*También se puede igualar directamente idSellers de body por el user._id primero, y después crear product:
                req.body.idSellers =  req.user._id
                const product = await Product.create(req.body);*/

            //añadir _id de product al array idProducts de User (para saber qué productos han sido creados por un seller)
            await User.findByIdAndUpdate(idSeller, {$push: {idProducts: product._id}}, {new: true});
          
            res.send({ message: 'Product successfully added', product});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to add'});
        }
    },

    //actualizar producto
    async update(req,res) {
        try { 
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true}); 
            res.send({message: 'Product successfully updated', product});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to update'});
        }
    },

    //borrar producto por Id
    async deleteById(req,res) {
        try { 
            const idSeller = req.user._id;
            const product = await Product.findByIdAndDelete(req.params.id); 
            await User.findByIdAndUpdate(idSeller, {$pull: {idProducts: product._id}}, {new: true}); //quitar producto del arrary idProducts del vendedor
            res.send({message: 'Product successfully deleted', product});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to delete'});
        }
    },

     //Obtener todos los productos
     async getAll(req, res) {
        try {            
            const products = await Product.find();
            res.send({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },

    //Productos más vendidos  
    async getBestSelling(req, res) {
        try {
            const products= await Order.aggregate([
                {$unwind: '$ordersProducts'}, //convertimos el array ordersProducts en multiples doc
                {$group:{ //agrupar por idProduct y calculamos el número de repeticiones
                    _id:'$ordersProducts.idProduct', 
                    total:{ $sum:1 } }
                },
                {$sort : {total : -1}},
            ]);
            if(!products.length) return res.status(204).send();
            res.json({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },

    //Ordenar por precio de MENOR a mayor
    async sortLtPrice(req, res) {
        try {            
            const products = await Product.find().sort({price: 1});
            res.send({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },

    //Ordenar por precio de MAYOR a menor
    async sortGtPrice(req, res) {
        try {            
            const products = await Product.find().sort({price: -1});
            res.send({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },

    //Filtro por precio mayor o igual al indicado
    async filterPrice(req, res) {
        try {
            const products = await Product.find({price: { $gte: req.params.price } });
            if(!products.length) return res.status(204).send() //si no encuentra productos, un estado "No Content"
            res.json({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },
    
    //Obtener por nombre concreto
    async getByName(req,res) {
        try { 
            const product = await Product.findOne({name: req.params.name});
            if(!product) return res.status(204).send() //si no  lo encuentra, estado "No Content"
            res.send({message: 'Successful search', product});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get the product'});
        }
    },
    
    //Productos por seller
    async getBySeller(req, res) {
        try {            
            const products = await Product.find({ idSellers: req.params.seller });
            if(!products.length) return res.status(204).send() //si no encuentra productos, un estado "No Content"
            res.json({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There are no products for this seller, or the seller does not exist'});
        }
    },

    //Productos por categoría
    async getByCategorie(req, res) {
        try {
            const products = await Product.find({ categorie: req.params.categorie });
            if(!products.length) return res.status(204).send() //si no encuentra productos, un estado "No Content"
            res.json({message: 'Successful search', products});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get products'});
        }
    },

    //Obtener producto por ID
    async getById(req,res) {
        try {            
            const product = await Product.findById(req.params.id);
            if(!product) return res.status(204).send() //si no "No Content"
            res.send({message: 'Successful search', product});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get the product'});
        }
    },   

};

module.exports = ProductController;
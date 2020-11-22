const Order = require('../models/Order');
const User = require('../models/User');

const OrderController = {

    //añadir pedido de un producto
    async add(req, res) {
        try { 
            const idUser_ = req.user._id; //de la validación por token obtenemos req.user._id
            const order = await Order.create({
                ...req.body,
                idUser: idUser_,
                }); //se crea una petición de producto con las unidades correspondientes
            
            await User.findByIdAndUpdate(idUser_, {$push: {idOrders: order._id}}); //se actualiza user añadiendo order._id en el array idOrders
            res.send({message: 'Order successfully added', order});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to add'});
        }
    },

    //Obtener todas las compras 
    async getAll(req, res) {
        try {           
            const orders = await Order.find();
            res.send({message: 'Successful search', orders});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get orders'});
        }
    },

    //Obtener todas las comprar por usuario (factura). 
    async getByUser(req, res) {
        try {            
            //populate muestra los objetos referenciados. Mostramos los campos que queremos
            const orders = await Order.find({idUser: req.params.id}).populate('ordersProducts.idProduct idUser', 'name price categorie firstName lastName address');
            if(!orders.length) return res.status(204).send() //No content
            res.send({message: 'Successful search', orders});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get orders'});
        }
    },
    
    //Modificar compra por administrador
    async update(req,res) {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if(!order) return res.status(204).send() //No content 
            res.send({message: 'Order successfully updated', order});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to update'});
        }
    },

};

module.exports = OrderController;
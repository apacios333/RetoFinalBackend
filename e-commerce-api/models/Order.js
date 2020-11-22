const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

//crear esquema
const OrderSchema = new mongoose.Schema({
    idUser:{
        type: ObjectId,
        ref: 'User'
    },
    ordersProducts:[{ 
        idProduct: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        units: {
            type: Number,
            required: true
        },
    }]
}, {timestamps: true});

//construir el modelo 
const Order = mongoose.model('Order', OrderSchema);

//exportar el modelo
module.exports = Order;
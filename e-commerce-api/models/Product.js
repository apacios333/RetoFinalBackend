const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

//crear esquema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    }, 
    categorie: {
        type: String,
        required: true
    },
    idSellers:[{ //un array, un producto puede tener más de un vendedor
        type: ObjectId,
        ref: 'User'
    }]
}, {timestamps: true}); //actualización automática de campos cuando el esquema cambia)


//construir el modelo 
const Product = mongoose.model('Product', ProductSchema);

//exportar el modelo
module.exports = Product;



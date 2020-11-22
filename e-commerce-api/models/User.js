//importar mongoose
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
//importar bcryptjs para encriptar
const bcrypt = require('bcryptjs');

//crear esquema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{ 
        type: String,
        required: [true,'El email es requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es requerido'],
        minlength: 6,
    },
    address: {
        type: Object,
        street: String,
        number: String,
        required: true
    }, 
    role: {
        type: String,
        required: [true, 'El role es requerido'],
        default:'user',
        enum:['user','seller','admin']
    },
    userTokens: [String],
    idProducts: [{ //Array. Un seller puede tener varios productos
            type: ObjectId,
            ref: 'Product'
    }],
    idOrders: [{ //Array. Un user puede tener varios pedidos
        type: ObjectId,
        ref: 'Order'
}]
}, { //transformación de Json para que no aparezca password, ni tokens en frontend
    toJSON: {
        transform: function (doc,ret) {
            delete ret.password
            delete ret.userTokens
            return ret;
        },
        //virtuals: true //permite utilizar campos virtuales en Json
    }
}, {timestamps: true}); //actualización automática de campos cuando el esquema cambia
//campo virtual para crear un nuevo campo role-email
/*UserSchema.virtual('role-email').get(function (params) {
    const user = this;
    return {
        role: user.role,
        email: user.email
    }

})*/

//antes (pre) de guardar ('save') el documento encripta la contraseña
UserSchema.pre('save', async function(next) {
    try{
        const user = this; // No poner una callback, hacerlo así porque necesitamos el this,"this" objeto que se crea por moongose
        user.password = await bcrypt.hash(user.password, 9);
        next()
    } catch (error) {
        console.error(error);
    }
})


//construir el modelo User
const User = mongoose.model('User', UserSchema);

//exportar el modelo
module.exports = User;
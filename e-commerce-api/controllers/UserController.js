//importar el modelo de User (el que interactúa con MongoDB), signToken para crear token, comparePassword para validar password
const User = require('../models/User');
const {signToken, comparePassword} = require('../services/service'); 
const bcrypt = require('bcryptjs');

//métodos del controlador
const UserController = {
    
    //registrar usuario
    async signup(req,res) {
        try {
            const user = await User.create(req.body);
            res.send({message: 'User successfully created', user});
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to register... The fields are required'});
        }
    },

    //login usuario (se firma token, autentificación, para ese usuario)
    async login (req, res){
        try{
            const { email, password } = req.body;
            
            //buscar user por email
            const user = await User.findOne({email});
            if(!user) return res.status(400).send({message: 'Email does not exist'}) 
            
            //valida si password introducido, en body, es igual al de la bd
            const validatedPassword = await comparePassword(password, user.password);
            if(!validatedPassword) return res.status(400).send({message: 'Password is not correct'});

            //generar token para un user.
            const userToken = signToken(user);

            //se añade userToken a array 'userTokens' (push), y se actualiza bd
            await User.findByIdAndUpdate(
                user._id,
                {$push: {userTokens: userToken}}
            );
            res.json({
                message: "You have log in successfully",
                userToken: userToken, 
                user: user
            });

        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get the user'});
        }
    },

    //Obtener usuario por Email
    async getByEmail(req, res) {
        try {            
            const user = await User.findOne({email: req.params.email});
            if(!user) return res.status(204).send() //si no encuentra el usuario un estado "No Content"
            res.send({message: 'User successfully found', user});
        
        } catch (error) {
            console.error(500) 
            res.send({message:'There was a problem trying to get the user'});
        }
    },
    
    //Modificar información del usuario por el propio usuario
    async updateUser(req, res)  {
            try {
                //cambios que queremos introducir por body
                const userUpdate = { ...req.body,
                                   role: req.user.role,
                                   idProducts: req.user.idProducts,
                                   idOrders: req.user.idOrders
                                };
                if ( !req.body.password ) return res.status(400).send({message: 'Password is required'});
                userUpdate.password = await bcrypt.hash( req.body.password, 9 ); //encriptar la nueva password
                const user = await User.findByIdAndUpdate( req.user._id, userUpdate, { new: true } ); //actualizar cambios    
                res.send({ message: 'Updated user', user });
            } catch (error) {
                console.error(500)
                res.send({ message: 'Don not update user' });
            } 
    },

    //Obtener todos los usuarios
    async getAll(req, res) {
        try {            
            const users = await User.find();
            res.send({message: 'Users successfully found', users});
        } catch (error) {
            console.error(500)
            res.send({ message: 'There was a problem trying to get the users' });
        } 
    },

    //Obtener usuario por ID
    async getById(req,res) {
        try {            
            const user = await User.findById(req.params.id);
            if(!user) return res.status(204).send(); 
            res.send({message: 'User successfully found', user});
        } catch (error) {
            console.error(500)
            res.send({ message: 'There was a problem trying to get the user' });
        } 
    },
    
    //actualizar usuario
    async update(req,res) {
        try { 
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}); //se actualiza con los campos que pase al body, los otros los ignora
            //{new:true} para que actualice el frontend con el cambio nuevo, si no, te muestra por defecto el viejo
            res.send({message: 'User successfully updated', user});
        } catch (error) {
            console.error(500)
            res.send({ message: 'There was a problem trying to update the user' });
        } 
    },

    //borrar usuario por Id
    async deleteById(req,res) {
        try { 
            const user = await User.findByIdAndDelete(req.params.id);  
            res.send({message: 'User successfully deleted', user});
        } catch (error) {
            console.error(500)
            res.send({ message: 'There was a problem trying to delete the user' });
        } 
    }
};

module.exports = UserController;
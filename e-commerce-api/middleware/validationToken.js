const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

//validación del token, si se cumple, para a la siguiente orden en router
const validationToken = async(req, res, next) => {
        try {
            //obtener el token del header de la variable authorization
            const userToken = req.headers.authorization;  
            if(!userToken) return res.status(401).send({message: "Authentication token is required"})
            //verificación el token dando la clave secreta
            const payload = jwt.verify(userToken, 'secretJsonwebtokens'); 
            //buscar ese usuario con el id y token correspondiente
            const user = await User.findOne({
                _id: payload._id,
                userTokens: userToken
            });
            if (!user) return res.status(401).send({message: 'Unauthorized user'});
           
            req.user = user;
            next();
        } catch (error) {
            console.error(error)
            res.status(401).send({message: 'Unauthorized',error})
        }
    }

module.exports = validationToken


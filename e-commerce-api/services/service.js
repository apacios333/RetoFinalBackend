//servicio para crear token de validación, comparar password introducida pora password encriptada en bd

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const signToken = (user) => {
    return jwt.sign({ _id: user._id }, 'secretJsonwebtokens', {expiresIn: '24h'});
};

const comparePassword = async (visiblePassword, jwtPassword) => {
    return await bcrypt.compare(visiblePassword, jwtPassword); 
};


module.exports = { signToken, comparePassword };

//importar express
const express = require('express');
// usar router() para las rutas 
const router = express.Router();

//importar los controladores, la validación de toquen y usuario
const UserController = require('../controllers/UserController');
const validationToken = require('../middleware/validationToken.js');
const validationRole = require('../middleware/validationRole.js');

//Rutas

//Cualquier usuario
router.post('/', UserController.signup); //registro de un usuario, email y password requeridos
router.post('/login', UserController.login); //login, firma el token

//Usuario concreto
router.get('/email/:email', validationToken, UserController.getByEmail); //perfil de un usuario
router.put('/modify', validationToken, UserController.updateUser); //modificar un usuario por el propio usuario

//Admin
// se chequea token, si es correcto "siguiente". Se chequea usuario se admin, si es correcto "siguiente", se ejecuta el método
router.get('/', validationToken, validationRole(['admin']), UserController.getAll); //lista todos los usuarios
router.get('/:id', validationToken, validationRole(['admin']), UserController.getById); //perfil de un usuario por id
router.put('/:id', validationToken, validationRole(['admin']), UserController.update ); //modificar un usuario
router.delete('/:id', validationToken, validationRole(['admin']), UserController.deleteById); //borrar un usuario

module.exports = router;
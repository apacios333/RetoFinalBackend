const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController');
const validationToken = require('../middleware/validationToken');
const validationRole = require('../middleware/validationRole');

//Rutas
router.post('/', validationToken, OrderController.add); //añadir compra por un usuario
router.get('/', validationToken, validationRole(['seller']), OrderController.getAll); //mostrar todas las compras realizadas 
router.get('/user/:id', validationToken, validationRole(['seller']), OrderController.getByUser); //mostrar todas las comprar por usuario (:id), (factura)
router.put('/:id', validationToken, validationRole(['seller']), OrderController.update) //modificar una compra


module.exports = router;





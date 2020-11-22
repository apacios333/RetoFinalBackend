const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const validationRole = require('../middleware/validationRole');
const validationToken = require('../middleware/validationToken');

//Rutas

router.post('/', validationToken, validationRole(['seller']), ProductController.add); //añadir producto
router.put('/:id', validationToken, validationRole(['seller']), ProductController.update ); //modificar producto
router.delete('/:id', validationToken, validationRole(['seller']), ProductController.deleteById); //borrar producto
router.get('/', ProductController.getAll); //información de todos los productos
router.get('/bestselling', ProductController.getBestSelling); //productos más vendidos

router.get('/price/sortlt', ProductController.sortLtPrice); //ordenar por precio de menor a mayor
router.get('/price/sortgt', ProductController.sortGtPrice); //ordenar por precio de menor a mayor
router.get('/price/:price', ProductController.filterPrice); //filtrar por precio mayor o igual al indicado

router.get('/name/:name', ProductController.getByName); //producto por nombre
router.get('/seller/:seller', ProductController.getBySeller); //productos por seller
router.get('/categorie/:categorie', ProductController.getByCategorie); //producto por nombre

router.get('/:id', ProductController.getById); //información de un producto


module.exports = router;

# API REST. Backend e-COMMERCE
RETO Final. API REST. Backend e-COMMERCE - 2020-06-BTC Backend (Formación GeeksHubs).
Crear una API REST con [Express](https://expressjs.com/) con distintos Endpoints  y validación por Token.

#### Tabla de Contenidos
- [Introducción](#Introducción)
- [Contenido](#Contenido)
- [Pre-requisitos](#Pre-requisitos)
- [Instrucciones de Instalación y Configuración](#Instrucciones-de-Instalación-y-Configuración)
- [Uso](#Uso)
- [Herramientas utilizadas](#Herramientas-utilizadas)
- [Autor](#Autor)

## Introducción

Se ha creado una API REST para el Backend de una app e-commerce, con esquemas de usuarios (con diferentes roles), productos y compras. 

La codificación de la API es en base a lo aprendido en el Bootcamp, y los repositorios sugeridos en el mismo (por ejemplo, del repositorio https://github.com/DavidPinilla1/e-comerce-MERN.git).

Se ha utilizando una base de datos en sistema [MongoDB](https://www.mongodb.com/) y (json-web-token) para la autenticación.

Usando el servicio de la nube [Atlas MongoDB](https://www.mongodb.com/cloud/atlas) se crea una base de datos llamada 'ecommercedb'.

La funcionalidad y lógica se implementan en [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) con [Express](https://expressjs.com/), y [Mongoose](https://mongoosejs.com/) para la conexión a la base de datos.

## Contenido 
Este proyecto tiene una rama: **RetoFinalBackend** que incluye una carpeta con el proyecto: e-commerce-api.

## Pre-requisitos 
Se necesita para empezar a trabajar lo siguiente:

* Un editor de código (ejemplo [Virtual Studio Code](https://code.visualstudio.com/)).
* Un gestor de paquetes (ejemplo [Node.js](https://nodejs.org/es/)).
* Una conexión a la base de datos.
* Instalar [Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [Nodemon](https://nodemon.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).
* Tener [Postman](https://www.postman.com/) para crear peticiones sobre la API

## Instrucciones de Instalación y Configuración


Clona o descargar el respositorio:
https://github.com/apacios333/RetoFinalBackend.git


En mongoose.connect() ( config/ mongoose.js ), se debe conectar a la base de datos incluyendo:

'mongodb+srv://new_user_333:backend202006@cluster0.7lbyp.mongodb.net/ecommercedb?retryWrites=true&w=majority'

Desde [Virtual Studio Code](https://code.,visualstudio.com/) con [Node.js](https://nodejs.org/es/):

Instalar [Express](https://expressjs.com/)
* $ npm install express --save

Instalar [Nodemon](https://nodemon.io/) 

* $ npm install nodemon --save-dev

Dentro del directorio e-comerce-api, instale todos los módulos:
### `$ npm install`

(
[Mongoose](https://mongoosejs.com/)

* $ npm install mongoose

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

* $ npm install bcryptjs

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

* $ npm install jsonwebtoken)

## Uso 

Tras la instalación, en el directorio del proyecto, se ejecuta la API usando npm:

### `$ npm start`

A continuación se realizan consultas a la API desde [Postman](https://www.postman.com/):
- Gestión de Usuario: 

        Validación por token.
        Roles: Administrador /Usuario /Vendedor.
        Endpoint de registro.
        Endpoint de login.
        Endpoint de perfil de usuario.
        Endpoints modificar datos de usuario (administrador).

- Gestión de Producto:

        Endpoints añadir, eliminar, modificar producto (vendedor).
        Endpoint mostrar todos los productos.
        Endpoints productos filtro (más vendidos,precio, título).
        Endpoint de productos por vendedor.
        Endpoint de productos por categoría.

- Gestión de Compra:

        Endpoint de añadir compra.
        Endpoint mostrar todas las compras.
        Endpoint de compras por usuario.
        Endpoint modificación datos de compra por usuario (vendedor).


## Herramientas utilizadas

* [MongoDB](https://www.mongodb.com/) - Sistema de base de datos NoSQL orientado a documentos.
* [Atlas MongoDB](https://www.mongodb.com/cloud/atlas) - Servicio en la nube de [MongoDB](https://www.mongodb.com/).
* [Mongoose](https://mongoosejs.com/) - O.D.M para MongoDB en Node.js.
* [Express](https://expressjs.com/) - Framework para crear aplicaciones web en Node.js.
* [Nodemon](https://nodemon.io/) - Librería que actualiza en tiempo de ejecución los archivos del servidor.
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Librería para encriptación.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Estándar para token de autentificación.
* [JavaScript-ES6](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguaje de programación
* [GIT](https://git-scm.com/) - Método de control de versiones de código

## Autor
* **Alicia Pacios Martínez** - *Trabajo Inicial* - [apacios333](https://github.com/apacios333)

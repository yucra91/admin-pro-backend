require('dotenv').config();

const express = require('express'); // import {express} from 'express';
const cors = require('cors');

const {dbConnections} = require('./database/config');

// crear el servidor espress

const app = express();


// configurar cors
app.use(cors());

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// base de datos
dbConnections();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


// console.log(process.env);


// Rutas
// req es lo que se solicitata por ejemplo los header que cliente fue
// res es lo que nosotros o lo que nuestro servidor va responderle al cliente que acaba de solicitar algo a nuestro backend

// AqQ00oYd0Iw4pI2P
// mean_user

// app.get('/', (req, res) => {

//     res.json({
//         ok : true,
//         msg : 'hola mundo'
//     })
// });

// levantar el servidor 

app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo en puerto: ',process.env.PORT);
})
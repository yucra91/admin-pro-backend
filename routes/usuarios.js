/*
    Ruta: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuario');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJwt, getUsuario );

router.post( '/', 
[
    check('nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
],
crearUsuario );

router.put( '/:id', 
    [
        check('nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario 
);
router.delete( '/:id',
    validarJwt,
    borrarUsuario
)

module.exports = router;
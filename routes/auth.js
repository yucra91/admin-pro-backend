/*
    path : '/api/login'
*/

const { Router } = require('express');
 const { login, renewToken, googleSignIn } = require ('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.post( '/',
    [
        check('email', 'email es obligatorio').isEmail(),
        check('password', 'password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post( '/google',
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get( '/renew',
    validarJwt,
    renewToken
)


module.exports = router;
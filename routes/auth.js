/*
    path : '/api/login'
*/

const { Router } = require('express');
 const { login } = require ('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',
    [
        check('email', 'email es obligatorio').isEmail(),
        check('password', 'password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)


module.exports = router;
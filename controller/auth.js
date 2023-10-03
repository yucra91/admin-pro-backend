const { response } = require("express");
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/jwt");

const login = async ( req, res =response ) => {
    const { password, email } = req.body;
    try {

        // verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contaseña no es valido'
            })
        }

        // verificar contraseña

        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                smg: 'Contraseña o usuario no es valido'
            })
        }

        // Generar el token - JWT
        const token = await generarJwt( usuarioDB.id )

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' hable con el administrador'
        })
    }
}

module.exports = {
    login,
}
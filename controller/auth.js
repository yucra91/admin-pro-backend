const { response } = require("express");
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJwt( uid );


    res.json({
        ok: true,
        token
    });

}
const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJwt( usuario.id );
        
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

module.exports = {
    login,
    renewToken,
    googleSignIn,
}
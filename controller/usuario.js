const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/jwt');

const getUsuario =  async (req, res) => {
    const usuarios = await Usuario.find({},'nombre email role');

    res.json({
        ok : true,
       usuarios,
    //    uid: req.uid
    })
}

const crearUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // guardar usuario
        await usuario.save();

        // Generar el token - JWT
        const token = await generarJwt( usuario.id );

    
        console.log(req.body);
        res.json({
            ok : true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar logs'
        })
        
    }
}

const actualizarUsuario = async ( req, res = response ) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        const {password, google, email, ...campos} = req.body; 
        
        if ( usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: true,
                    msg: 'Ya exite un usuario con ese email'
                })
            }
        }
        
        // Actualizaciones
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            uid,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado....'
        })
    }
}

const borrarUsuario = async ( req, res = response ) =>{
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: 'usuario elimnado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperadp....'
        })
    }
}

module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}
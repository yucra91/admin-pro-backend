const jwt = require('jsonwebtoken');

const validarJwt = ( req, res, next ) => {
    // leer token 
    const token = req.header('x-token');
    // console.log(token);
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'token no encontrado'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        console.log(uid); 
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}

module.exports = { 
    validarJwt
}
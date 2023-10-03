
const jwt = require('jsonwebtoken');

const generarJwt = ( uid ) => {

    return new Promise ( ( resolve, reject ) => {
        const payload = {
            uid,
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h',
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject(`No se pudo ger¿nerar el token ${err}`);
            }

            else {
                resolve(token);
            }
        } );

    })

}

module.exports = {
    generarJwt
}
const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        };
        jwt.sign( payload,  process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        });
    });
}

module.exports = {
    generarJWT
}
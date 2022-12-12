const bcrypt = require('bcryptjs');

const User = require("../models/user");


const login = async(req, res = response) => {
    const {email, password, ...resto} = req.body;

    try {
        //Verificar si el email existe;
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Verificar si el usuario está activo
        if ( !user.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = await bcrypt.compareSync( password, user.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( user.id );
        
    } catch (error) {
        console.log(error);;
        res.status(500).json({
            msg: 'Consulte con el administrador'
        });
    }

    res.json({
        msg: 'Login ok',
        email,
        password
    });
}

module.exports = {
    login
}
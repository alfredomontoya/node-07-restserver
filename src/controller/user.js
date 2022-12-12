const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

const User = require('../models/user')

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ])

    res.json({
        total,
        users
    });

}

const usuariosGetById = async(req = request, res = response) => {

    const { id } = req.params;

    const user = await User.findById( id );


    res.json({
        user
    });

}

const usuariosPut = async(req, res) => {
    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        id,
        'msg': 'Put API - controlador',
        user
    });
}

const usuariosPost = (req, res) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    //Verificar si el correo existe

    //Encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    //Guardar en base de datos
    user.save();

    res.json({
        user
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const query = { estado: false };

    const user = await User.findByIdAndUpdate( id, query );

    res.json({
        'msg': 'Delete API - controlador',
        user
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        'msg': 'Patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosGetById,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
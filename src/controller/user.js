const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "no name", apikey, page=1, limit } = req.query;

    res.json({
        'msg': 'Get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        'msg': 'Put API - controlador',
        id
    });
}

const usuariosPost = (req, res) => {

    const { nombre, edad, id, apellido } = req.body;

    res.json({
        'msg': 'Post API - controlador',
        nombre,
        edad,
        id,
        apellido
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        'msg': 'Delete API - controlador'
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        'msg': 'Patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch, usuariosGetById } = require('../controller/user');
const { exiteUserByID, esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.get('/id/:id',[
    check('id', 'No es un Mongo Id válido').isMongoId(),
    check('id').custom( exiteUserByID ),
    validarCampos
], usuariosGetById);

router.put('/:id', [
    check('id', 'No es un ID de válido').isMongoId(),
    check('id').custom( exiteUserByID ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    check('rol').custom( esRoleValido ),    
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID de válido').isMongoId(),
    check('id').custom( exiteUserByID ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
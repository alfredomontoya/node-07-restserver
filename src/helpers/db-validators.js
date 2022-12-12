const Role = require("../models/role");
const User = require("../models/user");

const esRoleValido = async ( rol = '' ) => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol: ${rol}, no está registrado en la DB`);
    }

}

const emailExiste = async ( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if ( existeEmail ){
        throw new Error(`El email ${email}, ya se encuentra registrado en la DB`);
    } 

}

const exiteUserByID = async ( id = '' ) => {
    const existeUser = await User.findById( id );
    if ( !existeUser ) {
        throw new Error (`El id: ${id}, no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    exiteUserByID,
}
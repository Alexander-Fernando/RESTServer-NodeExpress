const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if( !existeRol ){
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const siExiste =await  Usuario.findOne( { correo });
    if( siExiste){
        throw new Error(`El correo ${correo} ya está registrado.`)
    }
}

const existeUsuarioID = async( id ) => {
    const existeID= await Usuario.findById( id );
    if( !existeID ){
        throw new Error(`No existe el ID: ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID
}
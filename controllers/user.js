const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuarioGet = async (req , res = response) => {
    // const {page, limit, q="Default"} = req.query;
    const {limit = 4, desde = 0} = req.query;
    const query  = { estado: true };
    // if(isNaN(limit) || isNaN(desde)){
    //     res.status(400).json({
    //         error: `El limite: ${limit} o el desde: ${desde} no es un número` 
    //     })
    //     throw new Error(`El limite: ${limit} o el desde: ${desde} no es un número`);
    // }
    
    
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limit))

    // const totalDocuments = await Usuario.countDocuments(query);

    const [total, documentos] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])


    res.json({total, documentos});
}

const usuarioPut = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...otrosDatos} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        otrosDatos.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, otrosDatos);

    res.json({
        msg:'put API',
        usuario
    });
}

const usuarioPost =  async (req, res) => {

    const {nombre, password, rol, correo} = req.body;
    const usuario = new Usuario( {nombre, password, rol, correo} );

    //HASHEAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
     
    //AGREGAR A LA BASE DE DATOS
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioDelete = async (req, res) => {
    const { id } = req.params;
    const uid = req.uid;
    const usuario = req.userAuth;
    const usuarioDelete = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuarioDelete,
        uid,
        usuario
    })
}

const usuarioPatch = (req, res) => {
    res.json({
        msg: 'Patch API desde el controller'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}
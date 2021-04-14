const { response } = require('express')

const usuarioGet = (req, res = response) => {
    const {page, limit, q="Default"} = req.query;

    res.json({
        msg:'get API',
        page,
        limit,
        q
    });

}

const usuarioPut = (req, res) => {
    const {id} = req.params;
    res.json({
        msg:'put API',
        id
    });
}

const usuarioPost =  (req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        msg:'post API',
        nombre, 
        edad
    });
}

const usuarioDelete = (req, res) => {
ms;
    res.json({
        msg:'delete API',
    });
}

const usuarioPatch = (req, res) => {
    res.json({
        msg: 'Patch API'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}
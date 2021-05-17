const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/obtener-token');
const { googleVerify } = require('../helpers/google-verify');


const authPost = async (req, res) => {
    const {correo, password} = req.body;

    const usuario = await Usuario.findOne({correo, estado:true});
    if(!usuario){
        return res.status(400).json({
            msg: 'Correo o password no existen la BD'
        })
    }

    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    if(!validarPassword){
        return res.status(400).json({
            msg: 'El password es incorrecto'
        })
    }

    const token = await generarJWT(usuario.id);
    res.json({
        usuario,
        token
    })
}


const googleSignin = async (req, res) => {

    const {id_token} = req.body;

    try {
        const {nombre, correo, img} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            const data = {
                nombre,
                correo,
                img,
                password: 'default',
                google: true
            };

            usuario = new Usuario(data);
            usuario.save()
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: `Consulte al administrador. Usuario bloqueado.`
            })
        }
        const token = await generarJWT(usuario.id);
        
        res.json({
            msg: 'Ok, Google Signin!',
            token
        })
    } catch (error) {
        console.error
    }
}

module.exports = {
    authPost,
    googleSignin
}
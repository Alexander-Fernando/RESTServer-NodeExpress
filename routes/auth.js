const {Router} = require('express');
const {check} = require('express-validator')
const { authPost, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const RouterAuth = Router();



RouterAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,authPost );

RouterAuth.post('/google', [
    check('id_token', 'El id_token es obligatorio!').notEmpty(),
    validarCampos
],  googleSignin)

module.exports = RouterAuth;


const {Router} = require('express');
const {check} = require('express-validator')
const { authPost } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const RouterAuth = Router();



RouterAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,authPost );

module.exports = RouterAuth;


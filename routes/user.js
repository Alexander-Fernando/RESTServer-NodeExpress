const { check } = require('express-validator')
const { Router } = require('express');

const {validarCampos, validarJWT, validarRoles, validarRol} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validators');

const { 
    usuarioGet, 
    usuarioPut, 
    usuarioPost, 
    usuarioDelete, 
    usuarioPatch } = require('../controllers/user'); 

const router = Router();



router.get('/', usuarioGet );

router.put('/:id',[
    check('id', 'id no permitido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    validarCampos
], usuarioPut);

router.post('/',[
    check('correo', 'El correo no es válido. Digite otro.').isEmail(),
    check('correo').custom( emailExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6-10 caracteres').isLength({ min: 6, max: 10 }),
    check('rol').custom( esRolValido ),
    validarCampos
],usuarioPost);

router.delete('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'id no permitido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    validarCampos
] ,usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;


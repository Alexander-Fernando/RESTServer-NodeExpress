const { Router } = require('express');
const router = Router();
const { 
    usuarioGet, 
    usuarioPut, 
    usuarioPost, 
    usuarioDelete, 
    usuarioPatch } = require('../controllers/user');
    

router.get('/', usuarioGet );

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;
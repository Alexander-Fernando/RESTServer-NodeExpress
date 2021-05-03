

const validarRol = (req, res, next) => {
    if(!req.userAuth){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin antes verificar el token!. Consulte al backend Developer.'
        })
    }

    const {rol, nombre} = req.userAuth;
    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre}, no está permitido de realizar la acción con el rol ${rol}`
        })
    }

    next();
}


const validarRoles = (...roles) => {
    return (req, res, next) => {
        if(!req.userAuth){
            return res.status(500).json({
                msg: 'No se puede validar Roles antes de validar el token. Consulte al backend Developer!'
            })
        }
        
        if(!roles.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg: `El usuario no está permitido para realizar la acción!`
            })
        }
        next();
    }
}

module.exports = {
    validarRol,
    validarRoles
}
const jwt = require('jsonwebtoken');


const generarJWT= (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: "5h"
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el Token');
            }else{
                resolve(token);
            }
        });
    });
}


module.exports = {
    generarJWT
}


/*

const jwtApp = require('jsonwebtoken');
const obtenerJWT = (uid = 'payload') => {
    return newPromise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.privateKey, {
            expiresIn: '5h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject(`No se pudo generar el token`)
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    obtenerJWT
}

*/
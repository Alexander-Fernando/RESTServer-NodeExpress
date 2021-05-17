const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_ID_CLIENT );

const googleVerify = async (idToken) => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_ID_CLIENT,
    })
    const {email:correo, name:nombre, picture:img } = ticket.getPayload();

    return {correo, nombre, img };
}

module.exports = { googleVerify }

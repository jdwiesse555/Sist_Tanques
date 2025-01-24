import JWT from "jsonwebtoken";
import { conexion } from "./conexion.js";
import { TipoUsuario } from "@prisma/client";

export const validarUsuario = async (req,res, next) => {
// si la informacioon luefo de validar cumple con todo, enconces dejamos pasar al siguiente controlador conla fuincion next
    const {authorization } = req.headers;

    if(!authorization) {
        return res.status(403).json({
            message:"Se necesita un token",
        });
    }
    // en  el header de authorization debe de enviar la token en el siguiente formato
    const token = authorization.split(" ")[1];
    // ['Beaere','xxx.yyyy.zzz']
    if(!token) {
        return res.status(403).json({
            message:"el formato de kla token debe ser Bearer YOUR_TOKEN"
        })
    }
    //el payload devolvera toda la informacino que colocamos
    const payload = JWT.verify(token,process.env.SECRET_KEY)
    const usuarioEncontrado = await conexion.usuario.findUniqueOrThrow({
        where:{id:payload.usuarioId}
    });

    //dentro del req (request) podemos agregar informacion 
    req.user = usuarioEncontrado;
    next();
}

export const validadAdmin = async (req,res,next) => {
    //req.user
    if(req.user.tipoUsuario === TipoUsuario.ADMIN) {
        next();
    } else {
        return res.json({
            message:`El usuario tiene que ser ${TipoUsuario.ADMIN} para realizar esta accion`
        })
    }
}
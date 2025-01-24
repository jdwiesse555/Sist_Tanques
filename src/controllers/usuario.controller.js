import {actulizarUsuarioSerializer, loginSerializer, registrarUsuarioSerializer} from "./serializers/usuario.serializer.js"
import { genSalt,hash, compare } from "bcrypt";
import {conexion} from "../conexion.js"
import JWT from "jsonwebtoken";


export const  registrarUsuario = async (req,res) => {
    const data = req.body.user
    //valida si la data esta corresta
   
    const dataValidada = registrarUsuarioSerializer.parse(data);
    console.log(dataValidada);

    const salt = await genSalt();
    const password = await hash(dataValidada.password,salt)

    const nuevoUsuario = await conexion.usuario.create({
        data:{
            email: dataValidada.email,
            apellido:dataValidada.apellido,
            nombre:dataValidada.nombre,
            password,
            tipoUsuario:dataValidada.tipoUsuario,
        },
        select:{
            id: true,
            email: true,
            apellido:true,
            nombre:true,
            tipoUsuario:true,
        },
    });

    return  res.json({
        message:"Usuario registado exitosamente",
        comtent:nuevoUsuario
    })

};


export const login = async (req,res) => {

    const dataValidada = loginSerializer.parse(req.body);

    const usuarioEncontrado = await conexion.usuario.findFirstOrThrow({
        where: { email:dataValidada.email},
    });
    console.log(usuarioEncontrado)

    const esLaPassword = await compare(
        dataValidada.password,
        usuarioEncontrado.password
    );

    if(esLaPassword) {
        const token = JWT.sign({usuarioId:usuarioEncontrado.id},
            process.env.SECRET_KEY,
            {
                expiresIn: 60 * 60 * 4, // si es entero son segundos alli seria 4 horas
            }
        )
        return res.json({
            message:"Bienvenido",
            content: token
        }) ;
    }
    
    return res.status(403).json({
        message:"Credenciales incorrecta"
    });
};


export const actulizarUsuario = async (req,res) => {
    
    const dataValidada = actulizarUsuarioSerializer.parse(req.body.user)
    
    const salt = await genSalt();
    dataValidada.password = await hash(dataValidada.password,salt)
    const usarioActualizado = await conexion.usuario.update({
        data : dataValidada,
        select: {
            id :true,
            nombre:true,
            apellido:true,
            email:true,
            tipoUsuario:true,
        },
        where: {
            id:Number(req.body.id)
        },
    })
    
    console.log(usarioActualizado)
    return res.json({
        message:"Usuario actualizado exitosamente",
        content : usarioActualizado,
    })
}


export const devolverUsuario = async (req,res) => {
    return res.json({
        content: req.user,
         }
    )
}
export const devolverUsuarioid = async (req,res) => {
       

    const usuarioEncontrado = await conexion.usuario.findFirstOrThrow({
        where: { id:Number(req.body.id)},
    });
    console.log(usuarioEncontrado)
    return res.json({
        message:"Lista de Usuarios exitosamente",
        content : usuarioEncontrado,
         }
    )
}

export const devolverUsuarios = async (req,res) => {
    const Listausuarios = await conexion.usuario.findMany()
    console.log(Listausuarios)
    return res.json({
        message:"Lista de Usuarios exitosamente",
        content : Listausuarios,
    })
}

export const borrarUsuario = async (req,res) => {
 
    console.log("pasoborrasdo")
    console.log(req.body.id)
    const usarioborrado = await conexion.usuario.delete({
      
        select: {
            id :true,
            nombre:true,
            apellido:true,
            email:true,
            tipoUsuario:true,
        },
        where: {
            id:Number(req.body.id)
        },
    })
    
    console.log(usarioborrado)
    return res.json({
        message:"Usuario borrado exitosamente",
        content : usarioborrado,
    })
}
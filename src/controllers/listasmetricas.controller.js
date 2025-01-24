import { conexion } from "../conexion.js";
//import { actulizartanqueSerializer,registrarTaqueSerializer } from "./serializers/tanques.serialize.js";
import {paginationSerializer} from "../util.js"
import { number } from "zod";
import { actulizarLmetricaSerializer,registrarLmetricaSerializer } from "./serializers/listametricas.serializer.js";

export const devolverListaMetricas = async (req,res) => {
    const Listasmetricas = await conexion.listametricas.findMany()
    
    return res.json({
        message:"Lista de metricas exitosamente",
        content : Listasmetricas,
    })
}

export const devolverLMetrica = async (req,res) => {
       

    const lmetricaEncontrado = await conexion.listametricas.findFirstOrThrow({
        where: { id:Number(req.body.id)},
    });
   
    return res.json({
        message:" Lista Metrica encontrado exitosamente",
        content : lmetricaEncontrado ,
         }
    )
}

export const actulizarLmetrica = async (req,res) => {
    const data = req.body.data

    const dataValidada =actulizarLmetricaSerializer.parse(data)
    

    const lmetricaActualizado = await conexion.listametricas.update({
        data : dataValidada,
        
        where: {

            id:Number(req.body.id)
        },
    })
    return res.json({
        message:"Lista Metrica actualizado exitosamente",
        content : lmetricaActualizado,
    })
}

export const registraLmetrica = async (req,res) => {
    const data = req.body.data

    const dataValidada =registrarLmetricaSerializer.parse(data)
    

    const lmetricacreada = await conexion.listametricas.create({
        data : dataValidada,    })
    return res.json({
        message:"Lista Metrica creada exitosamente",
        content : lmetricacreada,
    })
}

export const borrarLMetrica = async (req,res) => {
 
  
    const lmetricaborrado = await conexion.listametricas.delete({
      
        select: {
            id :true,
            metrica:true,

        },
        where: {
            id:Number(req.body.id)
        },
    })
    
   
    return res.json({
        message:"Lista Metrica borrado exitosamente",
        content : lmetricaborrado,
    })
}
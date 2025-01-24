import { conexion } from "../conexion.js";
import { actulizarMetricaSerializer,registrarMetricaSerializer } from "./serializers/metricas.serializer.js";
import {paginationSerializer} from "../util.js"
import { number } from "zod";


export const crearMetrica = async (req, res) => {
    const data = req.body.data
    
    data.vol_bbls = Number(req.body.data.vol_bbls)
    data.metrica=Number(req.body.data.metrica)
   
    const dataValidada = registrarMetricaSerializer.parse(data);

    const nuevoMetrica = await conexion.metricas.create({data:dataValidada});

    return res.json({
        message:"Metrica creado exitosamente",
        content: nuevoMetrica,
    })

}

export const devolverMetricas = async (req,res) => {

    const {page , perPage} = req.query
    let skip,take
    if(page && perPage){
        //Cuantos elementos se debe saltar
        skip = (Number(page) -1) * Number(perPage)
         //take cuantos elemetosse debe tomR LUEGO DEL SALTO
        take = Number(perPage)
    }
    
    
    const filtros = {};
    if (req.query.medida){
        filtros.codigo = {contains: req.query.medida};
    }


    const totalMetrica = await conexion.metricas.count({
        where:filtros,
    })    
    const ListaMetricas = await conexion.metricas.findMany({
        include:{lmetrica:true},
        where:filtros,
        skip,
        take,
    })


    const pageInfo = paginationSerializer(
        totalMetrica,
        Number(page),
        Number(perPage)
    )
    
    
    return res.json({
        message:"Lista de Metricas ",
        content : ListaMetricas,pageInfo,
    })
}


export const borrarMetrica = async (req,res) => {
 
  
    const metricaborrado = await conexion.metricas.delete({
      
        select: {
            id :true,
            codigo:true,

        },
        where: {
            id:Number(req.body.id)
        },
    })
    
   
    return res.json({
        message:"Metrica borrado exitosamente",
        content : metricaborrado,
    })
}

export const devolverMetrica = async (req,res) => {
       

    const metricaEncontrado = await conexion.metricas.findFirstOrThrow({
        where: { id:Number(req.body.id)},
    });
   
    return res.json({
        message:" Metrica encontrado exitosamente",
        content : metricaEncontrado ,
         }
    )
}

export const devolverMetricaValor = async (req,res) => {
       

    const metricaEncontrado = await conexion.metricas.findFirstOrThrow({
        where: { 
            metrica:Number(req.body.metrica),
            medida:req.body.medida,
        },
    });
   
    return res.json({
        message:" Metrica encontrado exitosamente",
        content : metricaEncontrado ,
         }
    )
}

export const actulizarMetrica = async (req,res) => {
    const data = req.body.data
    data.vol_bbls = Number(req.body.data.vol_bbls)
    data.metrica=Number(req.body.data.metrica)
    const dataValidada =actulizarMetricaSerializer.parse(data)
    

    const metricaActualizado = await conexion.metricas.update({
        data : dataValidada,

        where: {
            id:Number(req.body.id)
        },
    })
    
    
    return res.json({
        message:"Metrica actualizado exitosamente",
        content : metricaActualizado,
    })
}
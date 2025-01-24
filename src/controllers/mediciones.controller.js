import { conexion } from "../conexion.js";
import {paginationSerializer} from "../util.js"

import { actulizarMedicionesSerializer,registrarMedicionesSerializer } from "./serializers/mediciones.serializer.js";

export const devolverMedicones = async (req,res) => {
    const Listasmediciones = await conexion.mediciones.findMany({include:{lmetrica_med:true,ltk_med:true}})
    
    return res.json({
        message:"Lista de medicones exitosamente",
        content : Listasmediciones,
    })
}

export const devolverMedicion = async (req,res) => {
       

    const medicionEncontrado = await conexion.mediciones.findFirstOrThrow({
        include:{lmetrica_med:true,ltk_med:true},
        where: { id:Number(req.body.id)},
    });
   
    return res.json({
        message:" Medicicon encontrado exitosamente",
        content : medicionEncontrado ,
         }
    )
}



export const actulizarMedicion = async (req,res) => {
    const data = req.body.data
    console.log(data)
    data.fecha= new Date(data.fecha)
    console.log(data)
    data.tanque=Number(data.tanque)

    const tanque = await conexion.tanques.findFirstOrThrow({
        where: { id:Number(data.tanque)},
    });
    data.metrica=tanque.metrica
    const vol_agua = await conexion.metricas.findFirstOrThrow({
        where: { 
            metrica:Number(data.metrica),
            medida:data.agua_pies.padStart(2,0)+data.agua_pul,
        },
    });
    const vol_crudo = await conexion.metricas.findFirstOrThrow({
        where: { 
            metrica:Number(data.metrica),
            medida:data.crudo_pies.padStart(2,0)+data.crudo_pul,
        },
    });
    data.stock_agua=Number(vol_agua.vol_bbls)
    data.stock_crudo=Number(vol_crudo.vol_bbls)
    if (data.stock_agua == 0 || data.stock_crudo==0 || parseFloat(data.stock_crudo)+parseFloat(data.stock_agua)>parseFloat(tanque.capacidad) ) {
        if(parseFloat(data.stock_crudo)+parseFloat(data.stock_agua)>parseFloat(tanque.capacidad)) {
            return res.json({
                message:"Error :la suma de los volumenes no puede ser mayor a "+  tanque.capacidad+"volumen crudo: "+data.stock_crudo+"  volumen agua :"+data.stock_agua
                
            })

          
        } else {
            return res.json({
                message:"Error :No existe data en las tabla en metricas",
                
            })}
        
      } else {

    console.log("1",data)
    const dataValidada =registrarMedicionesSerializer.parse(data)
    
    console.log("2",dataValidada)
    const medicionact = await conexion.mediciones.update({
        data : dataValidada,  
        where: {
            id:Number(req.body.id)
        },
          })
    return res.json({
        message:"Medicion autualizada exitosamente",
        content : medicionact,
    })
}
}

export const registramedicion = async (req,res) => {
    const data = req.body.data
    console.log(data)
    data.fecha= new Date(data.fecha)
    console.log(data)
    data.tanque=Number(data.tanque)

    const tanque = await conexion.tanques.findFirstOrThrow({
        where: { id:Number(data.tanque)},
    });
    data.metrica=tanque.metrica
    const vol_agua = await conexion.metricas.findFirstOrThrow({
        where: { 
            metrica:Number(data.metrica),
            medida:data.agua_pies.padStart(2,0)+data.agua_pul,
        },
    });
    const vol_crudo = await conexion.metricas.findFirstOrThrow({
        where: { 
            metrica:Number(data.metrica),
            medida:data.crudo_pies.padStart(2,0)+data.crudo_pul,
        },
    });
    data.stock_agua=Number(vol_agua.vol_bbls)
    data.stock_crudo=Number(vol_crudo.vol_bbls)
    
    if (data.stock_agua == 0 || data.stock_crudo==0 || parseFloat(data.stock_crudo)+parseFloat(data.stock_agua)>parseFloat(tanque.capacidad) ) {
        if(parseFloat(data.stock_crudo)+parseFloat(data.stock_agua)>parseFloat(tanque.capacidad)) {
            return res.json({
                message:"Error : la suma de los volumenes no puede ser mayor a "+  tanque.capacidad+"volumen crudo: "+data.stock_crudo+"  volumen agua :"+data.stock_agua
                
            })

          
        } else {
            return res.json({
                message:"Error : No existe data en las tabla en metricas",
                
            })}
        
      } else {

    const dataValidada =registrarMedicionesSerializer.parse(data)
    
    console.log("2",dataValidada)
    const medicioncreada = await conexion.mediciones.create({
        data : dataValidada,    })
    return res.json({
        message:"Medicion creada exitosamente",
        content : medicioncreada,
    })
}
}

export const borrarMedicon = async (req,res) => {
 
  
    const medicionaborrado = await conexion.mediciones.delete({
      
        select: {
            id :true,
            metrica:true,

        },
        where: {
            id:Number(req.body.id)
        },
    })
    
   
    return res.json({
        message:"Mediocion borrado exitosamente",
        content : medicionaborrado,
    })
}
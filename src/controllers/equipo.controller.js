import { conexion } from "../conexion.js";
import { crearEquipoSerializer } from "./serializers/equipo.serializer.js";
import {paginationSerializer} from "../util.js"

export const crearEquipo = async (req, res) => {
    const dataValidada = crearEquipoSerializer.parse(req.body);

    const nuevoEquipo = await conexion.equipo.create({data:dataValidada});

    return res.json({
        message:"equpo creado exitosamente",
        content: nuevoEquipo,
    })

}

export const devolverequipos = async (req,res) => {

    const {page , perPage} = req.query
    let skip,take
    if(page && perPage){
        //Cuantos elementos se debe saltar
        skip = (Number(page) -1) * Number(perPage)
         //take cuantos elemetosse debe tomR LUEGO DEL SALTO
        take = Number(perPage)
    }
    
    
    const filtros = {};
    if (req.query.nombre){
        filtros.nombre = {contains: req.query.nombre};
    }
    if (req.query.estadio){
        filtros.estadio = {contains: req.query.estadio};
    }

    const totalEquipos = await conexion.equipo.count({
        where:filtros,
    })    
    const Listaequipos = await conexion.equipo.findMany({
        where:filtros,
        skip,
        take,
    })


    const pageInfo = paginationSerializer(
        totalEquipos,
        Number(page),
        Number(perPage)
    )
    
    
    return res.json({
        message:"Lista de equipos exitosamente",
        content : Listaequipos,pageInfo,
    })
}


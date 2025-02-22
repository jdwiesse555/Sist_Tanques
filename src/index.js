import express from "express";
import { usuarioEnrutador } from "../routes/usuario.routes.js";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import cors from "cors";
import AWS from "aws-sdk"
import { tanquesEnrutador } from "../routes/tanques.router.js";
import { listametricasEnrutador } from "../routes/listametricas.routes.js";
import { metricaEnrutador } from "../routes/metricas.routes.js";
import { medicionesEnrutador } from "../routes/mediciones.routes.js";
//import {swaggerDocs} from "./swagger.js"
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with {type:'json'};

AWS.config.update({ 
    credentials : {
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
     },
     region:process.env.BUCKET_REGION,
});

const servidor = express();
// cros para poder permitir peticiones en mi backend
servidor.use(cors());
servidor.use(express.json());

servidor.use('/doc',swaggerUI.serve,swaggerUI.setup(swaggerDocumentation ));
//agregar rutas
servidor.use(usuarioEnrutador);
servidor.use(tanquesEnrutador);
servidor.use(listametricasEnrutador);
servidor.use(metricaEnrutador);
servidor.use(medicionesEnrutador);
//Para capturar el error local debe estar antes de las rutas
servidor.use((error,req,res,next) => {
    if(error instanceof ZodError){
        return res.status(400).json({
            message:"Error al recibir la informacion",
            content:error.errors,
        })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        return res.status(404).json({
            message:`El ${error.meta.modelName } no existe`,
        })
    }

    console.log(error)
    return res.status(400).json({
        message:"Error al hacer la peticion"
    })
});


servidor.listen(process.env.PORT,() => {
    console.log(`serviodr corriendo exitosamente en el puerto ${process.env.PORT} `);
  //  swaggerDocs(servidor,process.env.PORT);
})
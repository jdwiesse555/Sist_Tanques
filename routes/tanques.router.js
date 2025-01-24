import express from 'express';
import { borrartanque, crearTanque, devolverTanques,devolvertanque,actulizarTanque } from '../src/controllers/taques.controller.js';
import { validadAdmin,validarUsuario } from '../src/middlewares.js';
import asyncHandler from "express-async-handler"


export const tanquesEnrutador = express();

//captura el controlador asycrono

tanquesEnrutador
.route("/tanque")
.post(asyncHandler(validarUsuario),
    asyncHandler(crearTanque));
tanquesEnrutador.route("/tanques")
.get(
    asyncHandler(devolverTanques));
tanquesEnrutador.route("/deltanques")
.put(asyncHandler(borrartanque));
    
tanquesEnrutador.route("/devtanques")
.post(asyncHandler(devolvertanque));    
tanquesEnrutador.route("/acttanques")
.put(asyncHandler(actulizarTanque));

import express from 'express';
import { devolverMedicones,devolverMedicion,actulizarMedicion,registramedicion,borrarMedicon } from '../src/controllers/mediciones.controller.js';
import { validadAdmin,validarUsuario } from '../src/middlewares.js';
import asyncHandler from "express-async-handler"


export const medicionesEnrutador = express();

//captura el controlador asycrono


medicionesEnrutador.route("/listasmediciones")
.get(asyncHandler(devolverMedicones));
medicionesEnrutador.route("/medicion")
.post(asyncHandler(devolverMedicion));
medicionesEnrutador.route("/actlmedicion")
.put(asyncHandler(actulizarMedicion));
medicionesEnrutador.route("/registramedicion")
.put(asyncHandler(registramedicion));
medicionesEnrutador.route("/borrarmedicion")
.put(asyncHandler(borrarMedicon));
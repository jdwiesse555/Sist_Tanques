import express from 'express';
import { devolverListaMetricas,devolverLMetrica,actulizarLmetrica,registraLmetrica,borrarLMetrica } from '../src/controllers/listasmetricas.controller.js';
import { validadAdmin,validarUsuario } from '../src/middlewares.js';
import asyncHandler from "express-async-handler"


export const listametricasEnrutador = express();

//captura el controlador asycrono


listametricasEnrutador.route("/listasmetricas")
.get(asyncHandler(devolverListaMetricas));
listametricasEnrutador.route("/listasmetrica")
.post(asyncHandler(devolverLMetrica));
listametricasEnrutador.route("/actlmetrica")
.put(asyncHandler(actulizarLmetrica));
listametricasEnrutador.route("/registralmetrica")
.put(asyncHandler(registraLmetrica));
listametricasEnrutador.route("/borrarlmetrica")
.put(asyncHandler(borrarLMetrica));
import express from 'express';
import { devolverMetricaValor,borrarMetrica, crearMetrica, devolverMetrica,devolverMetricas,actulizarMetrica } from '../src/controllers/metricas.controller.js';
import { validadAdmin,validarUsuario } from '../src/middlewares.js';
import asyncHandler from "express-async-handler"


export const metricaEnrutador = express();

//captura el controlador asycrono

metricaEnrutador
.route("/metrica")
.post(asyncHandler(validarUsuario),
    asyncHandler(crearMetrica));
metricaEnrutador.route("/metricas")
.get(asyncHandler(devolverMetricas));
metricaEnrutador.route("/delmetrica")
.put(asyncHandler(borrarMetrica));
    
metricaEnrutador.route("/devmetrica")
.post(asyncHandler(devolverMetrica));    
metricaEnrutador.route("/actmetrica")
.put(asyncHandler(actulizarMetrica));
metricaEnrutador.route("/devmetricaval")
.post(asyncHandler(devolverMetricaValor));

import express from 'express';
import { crearEquipo,devolverequipos } from '../src/controllers/equipo.controller.js';
import { validadAdmin,validarUsuario } from '../src/middlewares.js';
import asyncHandler from "express-async-handler"


export const equipoEnrutador = express();

//captura el controlador asycrono

equipoEnrutador
.route("/equipo")
.post(asyncHandler(validarUsuario),asyncHandler(validadAdmin),
    asyncHandler(crearEquipo));
equipoEnrutador.route("/equipos")
.get(
    asyncHandler(devolverequipos));

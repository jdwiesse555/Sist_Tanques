import express from 'express';
import { resetPassword,registrarUsuario,login, actulizarUsuario,devolverUsuario,devolverUsuarios,devolverUsuarioid,borrarUsuario, sendEmailToResetPass} from '../src/controllers/usuario.controller.js';
import asyncHandler from "express-async-handler"
import { validarUsuario ,validadAdmin} from '../src/middlewares.js';

export const usuarioEnrutador = express.Router();

usuarioEnrutador.post("/registro",asyncHandler(validarUsuario),asyncHandler(validadAdmin),asyncHandler(registrarUsuario));

usuarioEnrutador.post("/login",asyncHandler(login));
usuarioEnrutador.put("/actualizar-usuario",asyncHandler(validarUsuario),asyncHandler(validadAdmin),asyncHandler(actulizarUsuario));
usuarioEnrutador.get("/usuario",asyncHandler(validarUsuario),asyncHandler(devolverUsuario));
usuarioEnrutador.get("/listausuarios",asyncHandler(validarUsuario),asyncHandler(validadAdmin),asyncHandler(devolverUsuarios));
usuarioEnrutador.post("/usuarioid",asyncHandler(validarUsuario),asyncHandler(validadAdmin),asyncHandler(devolverUsuarioid));
usuarioEnrutador.put("/delusuario",asyncHandler(validarUsuario),asyncHandler(validadAdmin),asyncHandler(borrarUsuario));
usuarioEnrutador.post("/sendemail",asyncHandler(sendEmailToResetPass));
usuarioEnrutador.post("/resetclave/:token",asyncHandler(resetPassword)); 





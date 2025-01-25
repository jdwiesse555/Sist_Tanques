import { TipoUsuario } from "@prisma/client"
import { z } from "zod"


export const registrarUsuarioSerializer = z.object({
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*&%?#])[A-Za-z\d@$!*&%?#]{8,}$/),
  tipoUsuario: z.enum([
    TipoUsuario.ADMIN,
    TipoUsuario.MODERADOR,
    TipoUsuario.USUARIO,
  ]),
    nombre: z.string().optional(),
    apellido: z.string().optional(),

});


export const loginSerializer = z.object({
  email:z.string().email(),
  password: z.string(),
})

export const actulizarUsuarioSerializer = z.object({
 
  nombre: z.string().optional(),
  apellido: z.string().optional(),
  tipoUsuario: z.enum([
    TipoUsuario.ADMIN,
    TipoUsuario.MODERADOR,
    TipoUsuario.USUARIO,
  ]),
})

export const cambioPasswordSerializer = z.object({
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*&%?#])[A-Za-z\d@$!*&%?#]{8,}$/),
})
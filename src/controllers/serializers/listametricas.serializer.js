
import { z } from "zod"

export const registrarLmetricaSerializer = z.object({
    comentario: z.string().optional(),
    metrica: z.string(),
 
  
  });

  export const actulizarLmetricaSerializer = z.object({
    
    comentario: z.string().optional(),
  })
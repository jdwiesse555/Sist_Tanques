
import { z } from "zod"

export const registrarTaqueSerializer = z.object({
    codigo: z.string(),
    metrica: z.number(),
      capacidad: z.number(),
      HEIGHT_PIES: z.number(),
  
  });

  export const actulizartanqueSerializer = z.object({
    
    metrica: z.number(),
    capacidad: z.number(),
    HEIGHT_PIES: z.number(),
  })
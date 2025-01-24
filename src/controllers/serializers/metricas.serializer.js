
import { z } from "zod"

export const registrarMetricaSerializer = z.object({
    
    metrica: z.number(),
      medida: z.number(),
      vol_bbls: z.number(),
  
  });

  export const actulizarMetricaSerializer = z.object({
    
    medida: z.number(),
    vol_bbls: z.number(),
  })

import { z } from "zod"

export const registrarMetricaSerializer = z.object({
    
      metrica: z.number(),
      medida: z.string(),
      vol_bbls: z.number(),
  
  });

  export const actulizarMetricaSerializer = z.object({
    
    vol_bbls: z.number(),
  })
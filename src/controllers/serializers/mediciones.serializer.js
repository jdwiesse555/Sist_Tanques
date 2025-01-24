
import { z } from "zod"

export const registrarMedicionesSerializer = z.object({
    
    fecha : z.date(),
    tanque: z.number(),
    metrica :z.number(),
    agua_pies :z.string(),
    agua_pul :z.string(),
    crudo_pies :z.string(),
    crudo_pul :z.string(),
    stock_agua : z.number(), 
    stock_crudo : z.number(),

  
  });

  export const actulizarMedicionesSerializer = z.object({
    
    
    
    metrica :z.number(),
    agua_pies :z.string(),
    agua_pul :z.string(),
    crudo_pies :z.string(),
    crudo_pul :z.string(),
    stock_agua : z.number(), 
    stock_crudo : z.number(),
  })
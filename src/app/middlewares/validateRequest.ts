import type { NextFunction, Request, Response } from "express";
import type z from "zod";

type TRequestSchema = z.ZodObject<{
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}>;

export const validateRequest = (schema: TRequestSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = result.body;

      next();
    } catch (error) {
      next(error);
    }
  };
};

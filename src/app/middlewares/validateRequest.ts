import type { NextFunction, Request, Response } from "express";
import type z from "zod";
import { catchAsync } from "../utils/catchAsync";

type TRequestSchema = z.ZodObject<{
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}>;

export const validateRequest = (schema: TRequestSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    req.body = result.body;
    next();
  });
};

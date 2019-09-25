import joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export const joiValidate = <T>(schema: joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  schema
    .validate(req.body)
    .then((updatedBody: T) => {
      req.body = updatedBody;
      next();
    })
    .catch((error: unknown) => {
      next(error);
    });
};

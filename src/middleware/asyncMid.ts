import { NextFunction, Request, Response } from 'express';

const asyncMid = (fn: (req: Request, res: Response) => Promise<unknown>) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  fn(req, res).catch(error => next(error));
};

export default asyncMid;

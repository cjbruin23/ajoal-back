import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error handler", err);
  res.status(400).json({
    msg: err.message,
    success: false,
  });
};

export default errorHandler;

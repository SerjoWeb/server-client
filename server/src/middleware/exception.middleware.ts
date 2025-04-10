import express from "express";

export default (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);

  return res.status(err.status).json({
    status: err.status || 500,
    message: err.message,
    errors: err.errors
  });
};

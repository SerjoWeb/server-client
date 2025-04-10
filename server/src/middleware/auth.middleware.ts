import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import { ApiError } from "../exceptions/api.exception";

dotenv.config();

export const isAuth = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
  try {
    const authToken = req.headers.authorization;

    const result = await axios.get(`${process.env.MS_GRAPH_URL}/me`, {
      headers: {
        "Authorization": authToken,
        "Content-Type": "application/json"
      }
    });

    if (result.status != 200) {
      return next(ApiError.unauthorized());
    }

    next();
  } catch (error) {
    return next(ApiError.unauthorized([{ Error: error }]));
  }
};

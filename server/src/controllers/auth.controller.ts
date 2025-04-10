import express from "express";

import { ApiError } from "../exceptions/api.exception";
import { authService } from "../services/auth.service";

class AuthController {
  async register(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };

  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };

  async activation(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };

  async me(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  };
};

export const authController = new AuthController();

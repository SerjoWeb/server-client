import express from "express";

import { isAuth } from "../middleware/auth.middleware";
import { authController } from "../controllers/auth.controller";

export default (router: express.Router) => {
  router.get("/auth/register", authController.register),
  router.post("/auth/login", authController.login),
  router.put("/costing/logout", isAuth, authController.logout),
  router.put("/costing/activation", authController.activation),
  router.put("/costing/refresh", authController.refresh),
  router.put("/costing/me", isAuth, authController.me)
};

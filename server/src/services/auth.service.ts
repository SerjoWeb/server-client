import dotenv from "dotenv";

import { ApiError } from "../exceptions/api.exception";
import { localStorageDB } from "../utils/localStorageDB";

dotenv.config();

class AuthService {
  async register() {
    
  };

  async login(login: string, password: string) {
    const mock = localStorageDB.get();
    const user = mock[0];

    if (login === "" || password === "") {
      throw ApiError.badRequest("Empty Credentials");
    }

    if (login !== user.email || password !== user.password) {
      throw ApiError.badRequest("Invalid Credentials");
    }

    
  };

  async logout() {
    
  };

  async activation() {
    
  };

  async refresh() {
    
  };

  async me() {
    
  };
};

export const authService = new AuthService();

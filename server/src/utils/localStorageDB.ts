import dotenv from "dotenv";

dotenv.config();

export enum ENROLES {
  USER = "USER",
  ADMIN = "ADMIN"
};

export type TUSER = {
  id: number,
  name: string,
  email: string,
  password: string,
  accessToken: string,
  refreshToken: string,
  role: ENROLES,
  activated: boolean
};

class LocalStorageDB {
  #store: TUSER[] | null;

  static instance: LocalStorageDB;

  constructor() {
    const mock: TUSER = {
      id: 1,
      name: "John Doe",
      email: "johndoe@admon.com",
      password: "admin12345",
      accessToken: "",
      refreshToken: "",
      role: ENROLES.ADMIN,
      activated: true
    };

    const localStorage = window.localStorage.get(process.env.LOCALSTORAGE);
    let _storage: TUSER[] | null;

    if (!localStorage) {
      window.localStorage.setItem(process.env.LOCALSTORAGE, JSON.stringify([mock]));
    }

    addEventListener("storage", () => {
      _storage = JSON.parse(localStorage);
    });

    this.#store = _storage;

    if (!!LocalStorageDB.instance) {
      return LocalStorageDB.instance;
    }

    LocalStorageDB.instance = this;
    return this;
  }

  get() {
    return this.#store;
  }
};

export const localStorageDB = new LocalStorageDB();

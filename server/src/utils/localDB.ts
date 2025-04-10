export enum ENROLES {
  USER = "USER",
  ADMIN = "ADMIN"
};

export type DBs = {
  mozIndexdDB?: IDBFactory,
  webkitIndexdDB?: IDBFactory,
  msIndexdDB?: IDBFactory,
  shimIndexdDB?: IDBFactory
}

class LocalDB {
  #global: Window & typeof globalThis & DBs;
  #db;
  #request;

  static instance: LocalDB;
  
  constructor() {
    this.#global = window;
    this.#db = this.#global.indexedDB      || 
               this.#global.mozIndexdDB    ||
               this.#global.webkitIndexdDB ||
               this.#global.msIndexdDB     ||
               this.#global.shimIndexdDB;

    this.#request = this.#db.open("usersDB", 1);

    this.#request.onerror = (err) => console.error(`IndexedDB error: ${this.#request.error}`, err);
    this.#request.onupgradeneeded = () => {
      const db = this.#request.result;
      const store = db.createObjectStore("users", { keyPath: "id" });

      const keys = {
        users: [
          { id: "id", unique: true },
          { name: "name" },
          { login: "login" },
          { password: "password" },
          { accessToken: "accessToken" },
          { refreshToken: "refreshToken" },
          { activation: "activation" },
          { role: "role" }
        ]
      };

      keys.users.forEach((key) => store.createIndex(key.id, key.id, { unique: key.unique }));
    };

    this.#request.onsuccess = () => {
      const db = this.#request.result;
      const transaction = db.transaction("users", "readwrite");
      const store = transaction.objectStore("users");

      store.put({
        id: "1",
        name: "admin-1",
        login: "admin-1",
        password: "admin-1",
        accessToken: "",
        refreshToken: "",
        activation: true,
        role: ENROLES.ADMIN
      });
    };

    if (!!LocalDB.instance) {
      return LocalDB.instance;
    }

    LocalDB.instance = this;
    return this;
  }

  getUser = <T>(store: string, key: string) => {
    let db: IDBDatabase;
    const open = this.#db.open("usersDB");

    return new Promise<T>((resolve, reject) => {
        open.onsuccess = () => {
            let request!: IDBRequest;
            db = open.result;

            if ([...db.objectStoreNames].find((name) => name === store)) {
                const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);

                if (key === "all") {
                  request = objectStore.getAll();
                } else {
                  request = objectStore.get(key);
                }

                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
                transaction.oncomplete = () => db.close();
            } else {
                indexedDB.deleteDatabase("usersDB");
            }
        };
    });
  };
};

export const authService = new LocalDB();

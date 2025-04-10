"use strict";

(() => {
  class Auth {
    constructor() {
      if (!!Auth.instance) {
        return Auth.instance;
      }

      Auth.instance = this;
      return this;
    }

    async #fetchRequest(url = "", method = "GET", body = JSON.stringify({})) {
      try {
        let response;

        if (method === "GET") {
          response = await fetch(url, {
            method: method
          });
        }

        if (method === "POST") {
          response = await fetch(url, {
            method: method,
            body: body,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

        if (!response.ok) {
          throw new Error(`Error: ${response}`);
        }

        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error.message);
      }
    }

    init() {
      this.#submit();
    }

    #notification(type, message) {
      const notify = document.getElementById("notification");

      if (notify) {
        notify.classList.add("shown");
        notify.classList.add(type);
        notify.innerText = message;

        const timeout = setTimeout(() => {
          notify.classList.remove("shown");
        }, 7000);

        return () => clearTimeout(timeout);
      }
    }

    async #submit() {
      const form = document.getElementById("auth-form");
      const labels = document.querySelectorAll("label");

      if (form && labels) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          const email = formData.get("email");
          const password = formData.get("password");

          if (!new RegExp("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}", "gm").test(email)) {
            labels[0].innerText = "Email: Invalid Email";
            labels[0].style.color = "#e7000b";
            return;
          }

          if (!new RegExp("(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$", "gm").test(password)) {
            labels[1].innerText = "Password: Incorrect Password Length";
            labels[1].style.color = "#e7000b";
            return;
          }

          labels[0].innerText = "Email";
          labels[0].style.color = "#000000";
          labels[1].innerText = "Password";
          labels[1].style.color = "#000000";
          
          /** request simulation to the server */
          this.#fetchRequest("mock.json", "GET")
            .then(data => {
              if (data.email !== email || data.password !== password) {
                this.#notification("error", "Invalid Credentials!");
                return;
              }

              form.reset();
              this.#notification("success", "Successfully logged in");
              return;
            })
            .catch(error => console.error(error))
            .finally(() => {});

          return;
        });
      }

      return;
    }
  }

  const auth = new Auth();
        auth.init();
})();

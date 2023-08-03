const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const headers = { "Content-Type": "application/json" };

class Http {
  constructor(base_url, token) {
    this.base_url = base_url;
    this.token = token;
  }

  get = async (url) => {
    if (this.token) {
      headers["Authorization"] = this.token;
    }

    try {
      const responce = await fetch(`${this.base_url}/${url}`, {
        headers,
      });

      const data = responce.status === 200 ? await responce?.json() : {};

      return {
        status: responce.status,
        data,
      };
    } catch (ex) {
      throw new Error(ex.message);
    }
  };
}

module.exports = Http;

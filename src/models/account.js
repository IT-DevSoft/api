const Http = require("./http");
const url = process.env.API_URL;
const token = process.env.TOKEN;

const http = new Http(url, token);

class Account {
  async accountExists(accountNumber) {
    try {
      const responce = await http.get(`api/account?lic=${accountNumber}`);
      return responce;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  async detailAccount(accountNumber) {
    try {
      const responce = await http.get(`api/account/${accountNumber}`);
      return responce;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  async accountPayments(id) {
    try {
      const responce = await http.get(`api/account/payments?id=${id}`);
      return responce;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  async accountAccruals(id) {
    try {
      const responce = await http.get(`api/account/accruals?id=${id}`);
      return responce;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}

module.exports = Account;

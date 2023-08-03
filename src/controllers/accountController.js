const Account = require("../models/account");
const logger = require("../utils/logger");
const db = require("../../models");

const account = new Account();

const runLogger = (status, req) => {
  status === 200
    ? logger.requestSuccess(req)
    : logger.requestFail(req, accountExists.status);
};

module.exports = {
  getAccounts: async (req, res) => {
    try {
      const { username, phone } = req.user;

      const user = await db.users.findOne({
        where: {
          login: username,
          phone,
        },
      });

      if (user) {
        const accounts = await db.personalaccounts.findAll({
          attributes: ["id", "lic", "address"],
          where: {
            userid: user.id,
          },
        });
        res.send(accounts);
        runLogger(200, req);
        return;
      }
      throw new Error("Invalid token");
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  add: async (req, res) => {
    try {
      const { username, phone } = req.user;
      const { account, address } = req.body;

      const user = await db.users.findOne({
        where: {
          login: username,
          phone,
        },
      });

      if (user) {
        const newAccount = await db.personalaccounts.create({
          providerid: 1,
          address: address,
          lic: account,
          userid: user.id,
        });

        res.send(newAccount);
        return;
      }

      throw new Error("Invalid token");
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  exists: async (req, res) => {
    try {
      const { accountNumber } = req.query;
      const accountExists = await account.accountExists(accountNumber);
      const { status, data } = accountExists;
      res.send(data);
      runLogger(status, req);
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  getAccount: async (req, res) => {
    try {
      const { accountNumber } = req.query;
      const detailAccount = await account.detailAccount(accountNumber);
      const { status, data } = detailAccount;
      res.send(data);
      runLogger(status, req);
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  getPayments: async (req, res) => {
    try {
      const { id } = req.query;
      const accountPayments = await account.accountPayments(id);
      const { status, data } = accountPayments;
      res.send(data);
      runLogger(status, req);
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },

  getAccruals: async (req, res) => {
    try {
      const { id } = req.query;
      const accountAccruals = await account.accountAccruals(id);
      const { status, data } = accountAccruals;
      res.send(data);
      runLogger(status, req);
    } catch (ex) {
      res.status(500).send(ex.message);
      logger.requestFail(req, ex.message);
    }
  },
};

const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/", accountController.getAccounts);
router.post("/add", accountController.add);
router.get("/exists", accountController.exists);
router.get("/detail", accountController.getAccount);
router.get("/payments", accountController.getPayments);
router.get("/accruals", accountController.getAccruals);

module.exports = router;

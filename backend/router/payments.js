const express = require("express");
const {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentByCard,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/add", addPayment);
router.get("/payment", getPayments);
router.get("/payment/:id", getPaymentById);
router.put("/payment/update/:id", updatePayment);
router.delete("/payment/delete/:id", deletePayment);
router.get("/payment/view/:card", getPaymentByCard);

module.exports = router;

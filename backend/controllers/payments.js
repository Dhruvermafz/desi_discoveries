const Payment = require("../models/Payment");

// Add a new payment
const addPayment = (req, res) => {
  let newPayment = new Payment(req.body);

  newPayment.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Payment saved successfully",
    });
  });
};

// Get all payments
const getPayments = (req, res) => {
  Payment.find().exec((err, payments) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPayments: payments,
    });
  });
};

// Get a payment by ID
const getPaymentById = (req, res) => {
  let paymentId = req.params.id;
  Payment.findById(paymentId, (err, payment) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      payment,
    });
  });
};

// Update a payment by ID
const updatePayment = (req, res) => {
  Payment.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, payment) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update successful",
      });
    }
  );
};

// Delete a payment by ID
const deletePayment = (req, res) => {
  Payment.findByIdAndRemove(req.params.id).exec((err, deletedPayment) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete successful",
      deletedPayment,
    });
  });
};

// Get a payment by card number
const getPaymentByCard = (req, res) => {
  const card = req.params.card;

  Payment.findOne({ card: card })
    .then((payment) => {
      if (payment == null) {
        res.status(400).json({ success: false, message: "Payment not found" });
      } else {
        res.json({
          id: payment._id,
          reference: payment.reference,
          name: payment.name,
          method: payment.method,
          card: payment.card,
          time: payment.time,
          amount: payment.amount,
          payf: payment.payf,
          no: payment.no,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Error fetching payment",
        error: err,
      });
    });
};

module.exports = {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentByCard,
};

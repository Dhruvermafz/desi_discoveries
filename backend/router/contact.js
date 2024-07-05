const express = require("express");
const {
  createContact,
  getAllContacts,
  getSingleContact,
} = require("../controllers/contactController");
const { verifyAdmin } = require("../utils/verifyToken");

const contactRouter = express.Router();

contactRouter.post("/", createContact);
contactRouter.get("/:id", verifyAdmin, getSingleContact);
contactRouter.get("/", verifyAdmin, getAllContacts);

module.exports = contactRouter;

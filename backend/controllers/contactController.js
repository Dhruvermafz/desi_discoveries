const Contact = require("../models/Contact");

export const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      message: "Name, email, phone, and message are required fields.",
    });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create contact" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to get contacts" });
  }
};

export const getSingleContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to get the contact" });
  }
};

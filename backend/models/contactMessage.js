const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const contactMessageModel = mongoose.model(
  "ContactMessage",
  contactMessageSchema
);
module.exports = contactMessageModel;

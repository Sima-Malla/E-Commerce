const contactMessageModel = require("../../models/ContactMessage");

// POST /api/contact
const contactMessageController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const newMessage = new contactMessageModel({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = contactMessageController;

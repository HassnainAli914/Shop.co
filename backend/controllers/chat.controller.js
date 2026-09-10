const chatModule = require("../modules/chat.module");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await chatModule.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await chatModule.getMessages(req.params.contactId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { contactId, text, sender, is_mine } = req.body;
    const targetContactId = contactId || req.params.contactId;
    const message = await chatModule.sendMessage(targetContactId, { text, sender, is_mine });
    res.status(201).json({ message: "Message sent successfully", chatMessage: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

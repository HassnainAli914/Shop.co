const express = require("express");
const { getContacts, getMessages, sendMessage } = require("../controllers/chat.controller");

const router = express.Router();

router.get("/contacts", getContacts);
router.get("/messages/:contactId", getMessages);
router.post("/send", sendMessage);
router.post("/messages/:contactId", sendMessage);

module.exports = router;

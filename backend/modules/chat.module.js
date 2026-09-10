const supabase = require("../configs/supabase");

exports.getContacts = async () => {
  const { data, error } = await supabase
    .from("chat_contacts")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

exports.getMessages = async (contactId) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

exports.sendMessage = async (contactId, messageData) => {
  const newMsg = {
    id: messageData.id || `m_${Date.now()}`,
    contact_id: contactId,
    sender: messageData.sender || "me",
    text: messageData.text,
    time: messageData.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    is_mine: messageData.is_mine !== undefined ? messageData.is_mine : true
  };

  const { data, error } = await supabase
    .from("chat_messages")
    .insert([newMsg])
    .select();
  if (error) throw new Error(error.message);

  // Update contact last message time
  await supabase
    .from("chat_contacts")
    .update({ time: newMsg.time })
    .eq("id", contactId);

  return data?.[0] || newMsg;
};

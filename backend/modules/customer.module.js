const supabase = require("../configs/supabase");

exports.getCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

exports.getCustomerById = async (id) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

exports.addCustomer = async (customerData) => {
  const id = customerData.id || Date.now().toString();
  const newCustomer = {
    id,
    name: customerData.name || "New Customer",
    user_name: customerData.userName || customerData.user_name || customerData.name?.toLowerCase().replace(/\s+/g, '_') || "user",
    email: customerData.email,
    phone: customerData.phone || "",
    location: customerData.location || "USA",
    orders_count: Number(customerData.orders_count || customerData.orders || 0),
    spent: Number(customerData.spent || 0),
    avatar: customerData.avatar || "",
    status: customerData.status || "Active",
    role: customerData.role || "Customer",
    address: customerData.address || "",
    city: customerData.city || "",
    country: customerData.country || "United States",
    pin_code: customerData.pinCode || customerData.pin_code || ""
  };

  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer])
    .select();
  if (error) throw new Error(error.message);
  return data?.[0] || newCustomer;
};

exports.updateCustomer = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("customers")
    .update(updatedData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data?.[0];
};

exports.removeCustomer = async (id) => {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
};

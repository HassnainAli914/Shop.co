const supabase = require("../configs/supabase");

exports.getOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

exports.getOrderById = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .or(`id.eq.${id},order_number.eq.#${id},order_number.eq.${id}`)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

exports.createOrder = async (orderData) => {
  const id = orderData.id || String(Math.floor(790968 + Math.random() * 1000));
  const orderNumber = orderData.orderNumber || orderData.order_number || `#${id}`;
  const orderDate = orderData.orderDate || orderData.order_date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const newOrder = {
    id,
    order_number: orderNumber,
    customer_name: orderData.customerName || orderData.customer_name || "Customer",
    user_name: orderData.userName || orderData.user_name || "user",
    email: orderData.email || "",
    phone: orderData.phone || "",
    avatar: orderData.avatar || "",
    branch: orderData.branch || "USA",
    payment_type: orderData.paymentType || orderData.payment_type || "Card",
    quantity: Number(orderData.quantity || 1),
    order_date: orderDate,
    status: orderData.status || "Pending",
    subtotal: Number(orderData.subtotal || 0),
    shipping_fee: Number(orderData.shippingFee !== undefined ? orderData.shippingFee : (orderData.shipping_fee || 20)),
    tax: Number(orderData.tax || 0),
    total: Number(orderData.total || 0),
    address: orderData.address || "",
    city: orderData.city || "",
    country: orderData.country || "United States",
    pin_code: orderData.pinCode || orderData.pin_code || "",
    state: orderData.state || "",
    card_number: orderData.cardNumber || orderData.card_number || "************",
    exp_date: orderData.expDate || orderData.exp_date || "12/29",
    cvv: orderData.cvv || "***",
    notes: orderData.notes || "",
    items: orderData.items || [],
    activity: orderData.activity || [
      {
        date: "Today",
        events: [
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), title: "Order Placed Successfully", subtitle: "", isBlue: true }
        ]
      }
    ]
  };

  const { data, error } = await supabase
    .from("orders")
    .insert([newOrder])
    .select();
  if (error) throw new Error(error.message);
  return data?.[0] || newOrder;
};

exports.updateOrder = async (id, updatedData) => {
  const formatted = {};
  if (updatedData.status) formatted.status = updatedData.status;
  if (updatedData.customerName || updatedData.customer_name) formatted.customer_name = updatedData.customerName || updatedData.customer_name;
  if (updatedData.userName || updatedData.user_name) formatted.user_name = updatedData.userName || updatedData.user_name;
  if (updatedData.email) formatted.email = updatedData.email;
  if (updatedData.phone) formatted.phone = updatedData.phone;
  if (updatedData.address) formatted.address = updatedData.address;
  if (updatedData.city) formatted.city = updatedData.city;
  if (updatedData.country) formatted.country = updatedData.country;
  if (updatedData.pinCode || updatedData.pin_code) formatted.pin_code = updatedData.pinCode || updatedData.pin_code;
  if (updatedData.paymentType || updatedData.payment_type) formatted.payment_type = updatedData.paymentType || updatedData.payment_type;
  if (updatedData.items) formatted.items = updatedData.items;
  if (updatedData.subtotal !== undefined) formatted.subtotal = updatedData.subtotal;
  if (updatedData.total !== undefined) formatted.total = updatedData.total;
  if (updatedData.quantity !== undefined) formatted.quantity = updatedData.quantity;

  const { data, error } = await supabase
    .from("orders")
    .update({ ...formatted, ...updatedData })
    .or(`id.eq.${id},order_number.eq.#${id},order_number.eq.${id}`)
    .select();
  if (error) throw new Error(error.message);
  return data?.[0];
};

exports.removeOrder = async (id) => {
  const { error } = await supabase
    .from("orders")
    .delete()
    .or(`id.eq.${id},order_number.eq.#${id},order_number.eq.${id}`);
  if (error) throw new Error(error.message);
};

const supabase = require("../configs/supabase");

exports.getDashboardStats = async () => {
  // Fetch orders, products, customers concurrently
  const [ordersRes, productsRes, customersRes] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("products").select("*").order("rating", { ascending: false }),
    supabase.from("customers").select("*").order("created_at", { ascending: false })
  ]);

  const orders = ordersRes.data || [];
  const products = productsRes.data || [];
  const customers = customersRes.data || [];

  // Total Earnings
  const totalEarnings = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Monthly breakdown for the current year
  const monthlyOrders = new Array(12).fill(0);
  const monthlyEarnings = new Array(12).fill(0);

  orders.forEach((o) => {
    let orderDate = null;
    if (o.created_at) {
      orderDate = new Date(o.created_at);
    } else if (o.order_date) {
      orderDate = new Date(o.order_date);
    }

    if (orderDate && !isNaN(orderDate.getTime())) {
      const month = orderDate.getMonth();
      monthlyOrders[month] += 1;
      monthlyEarnings[month] += Number(o.total) || 0;
    } else {
      const m = new Date().getMonth();
      monthlyOrders[m] += 1;
      monthlyEarnings[m] += Number(o.total) || 0;
    }
  });

  // Top / Popular products (with profit margin info)
  const popularProducts = products.slice(0, 5).map((p) => {
    const price = Number(p.price) || 0;
    const cost = Number(p.cost_price) || (price * 0.7);
    const profitMargin = price > 0 ? Math.round(((price - cost) / price) * 100) : 10;
    return {
      id: p.id,
      name: p.name,
      price: price,
      costPrice: cost,
      profitPercent: Math.max(profitMargin, 5),
      isProfit: profitMargin >= 0,
      image: p.image,
      category: p.category,
      rating: p.rating,
      reviews: p.reviews,
      stock: p.stock
    };
  });

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  return {
    totalEarnings,
    totalOrders,
    totalCustomers,
    totalProducts,
    monthlyOrders,
    monthlyEarnings,
    popularProducts,
    recentOrders
  };
};

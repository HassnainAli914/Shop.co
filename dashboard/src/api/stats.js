import { apiRequest } from './client';
import { getOrders, fetchOrdersFromBackend } from '../views/apps/order/orderData';
import { getProducts, fetchProductsFromBackend } from '../views/apps/e-commerce/productData';
import { getCustomers, fetchCustomersFromBackend } from '../views/apps/customer/customerData';

export const fetchDashboardStats = async () => {
  try {
    const data = await apiRequest('/stats');
    if (data && typeof data.totalEarnings !== 'undefined') {
      return data;
    }
  } catch (error) {
    console.warn('Backend /stats endpoint error, calculating from resources:', error);
  }

  // Fallback: fetch orders, products, customers and compute client-side
  const [orders, products, customers] = await Promise.all([
    fetchOrdersFromBackend(),
    fetchProductsFromBackend(),
    fetchCustomersFromBackend()
  ]);

  const totalEarnings = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  const monthlyOrders = new Array(12).fill(0);
  const monthlyEarnings = new Array(12).fill(0);

  orders.forEach((o) => {
    let orderDate = null;
    if (o.orderDate) {
      orderDate = new Date(o.orderDate);
    }
    if (orderDate && !isNaN(orderDate.getTime())) {
      const m = orderDate.getMonth();
      monthlyOrders[m] += 1;
      monthlyEarnings[m] += Number(o.total) || 0;
    } else {
      const m = new Date().getMonth();
      monthlyOrders[m] += 1;
      monthlyEarnings[m] += Number(o.total) || 0;
    }
  });

  const popularProducts = products.slice(0, 5).map((p) => {
    const price = Number(p.price) || 0;
    const cost = Number(p.costPrice) || (price * 0.7);
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

  return {
    totalEarnings,
    totalOrders,
    totalCustomers,
    totalProducts,
    monthlyOrders,
    monthlyEarnings,
    popularProducts,
    recentOrders: orders.slice(0, 5)
  };
};

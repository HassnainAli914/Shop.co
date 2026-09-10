import { API_BASE_URL, apiRequest } from '../../../api/client';

// ==============================|| ORDER DATA & API SYNC ||============================== //

export const mockProductsForOrder = [
  {
    id: '098256BH',
    name: 'Apple iPhone 14 Pro',
    sku: '098256BH',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '098336NT',
    name: 'Samsung Galaxy S23 Ultra',
    sku: '098336NT',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=150&auto=format&fit=crop&q=80'
  }
];

const initialOrders = [
  {
    id: '790955',
    orderNumber: '#790955',
    customerName: 'Joseph William',
    userName: 'joseph_william',
    email: 'john.doe@example.com',
    phone: '+1 5623598742',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branch: 'USA',
    paymentType: 'Card',
    quantity: 6,
    orderDate: '09 Sept 2026',
    status: 'Pending',
    subtotal: 6394.00,
    shippingFee: 20.00,
    tax: 105.00,
    total: 6519.00,
    address: '123 Main Street',
    city: 'New York',
    country: 'United States',
    pinCode: '100011',
    state: 'NY',
    cardNumber: '************',
    expDate: '12/29',
    cvv: '***',
    items: [
      {
        id: '098256BH',
        name: 'Apple iPhone 14 Pro',
        sku: '098256BH',
        unitPrice: 999.00,
        price: 999.00,
        quantity: 4,
        total: 3996.00,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: '098336NT',
        name: 'Samsung Galaxy S23 Ultra',
        sku: '098336NT',
        unitPrice: 1199.00,
        price: 1199.00,
        quantity: 2,
        total: 2398.00,
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=150&auto=format&fit=crop&q=80'
      }
    ],
    activity: [
      {
        date: 'Saturday, 10 January',
        events: [
          { time: '01:43 PM', title: 'Parcel has been delivered', subtitle: 'Recipient: Steve Sutton', isBlue: true },
          { time: '09:02 AM', title: 'Parcel is out for delivery', subtitle: null, isBlue: false },
          { time: '06:45 AM', title: 'Parcel has arrived at delivery station', subtitle: null, isBlue: false }
        ]
      },
      {
        date: 'Friday, 09 January',
        events: [
          { time: '12:16 PM', title: 'Parcel has been picked up by courier', subtitle: null, isBlue: false },
          { time: '09:32 AM', title: 'Seller is preparing to ship your parcel', subtitle: null, isBlue: false }
        ]
      }
    ]
  }
];

const STORAGE_KEY = 'berry_exact_orders_data';

export const getOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
  }
  return initialOrders;
};

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
};

export const fetchOrdersFromBackend = async () => {
  try {
    const data = await apiRequest('/orders');
    if (Array.isArray(data) && data.length > 0) {
      const formatted = data.map((o) => ({
        id: String(o.id),
        orderNumber: o.order_number || `#${o.id}`,
        customerName: o.customer_name || 'Customer',
        userName: o.user_name || 'user',
        email: o.email || '',
        phone: o.phone || '',
        avatar: o.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        branch: o.branch || 'USA',
        paymentType: o.payment_type || 'Card',
        quantity: Number(o.quantity || 1),
        orderDate: o.order_date || 'Today',
        status: o.status || 'Pending',
        subtotal: Number(o.subtotal || 0),
        shippingFee: Number(o.shipping_fee || 20),
        tax: Number(o.tax || 0),
        total: Number(o.total || 0),
        address: o.address || '',
        city: o.city || '',
        country: o.country || 'United States',
        pinCode: o.pin_code || '',
        state: o.state || '',
        cardNumber: o.card_number || '************',
        expDate: o.exp_date || '12/29',
        cvv: o.cvv || '***',
        items: o.items || [],
        activity: o.activity || []
      }));
      saveOrders(formatted);
      return formatted;
    }
  } catch (e) {
    // fallback
  }
  return getOrders();
};

export const getOrderById = (id) => {
  const orders = getOrders();
  return orders.find((o) => String(o.id) === String(id) || String(o.orderNumber).replace('#', '') === String(id)) || initialOrders[0];
};

export const addOrder = async (order) => {
  const newNum = order.id || String(Math.floor(790968 + Math.random() * 1000));
  const newOrder = {
    ...order,
    id: newNum,
    orderNumber: `#${newNum}`,
    orderDate: order.orderDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  const orders = getOrders();
  const updated = [newOrder, ...orders];
  saveOrders(updated);

  // Sync to Backend
  try {
    await apiRequest('/orders/create', {
      method: 'POST',
      body: JSON.stringify({
        id: newNum,
        orderNumber: newOrder.orderNumber,
        customerName: newOrder.customerName,
        userName: newOrder.userName,
        email: newOrder.email,
        phone: newOrder.phone,
        avatar: newOrder.avatar,
        branch: newOrder.branch,
        paymentType: newOrder.paymentType,
        quantity: newOrder.quantity,
        orderDate: newOrder.orderDate,
        status: newOrder.status,
        subtotal: newOrder.subtotal,
        shippingFee: newOrder.shippingFee,
        tax: newOrder.tax,
        total: newOrder.total,
        address: newOrder.address,
        city: newOrder.city,
        country: newOrder.country,
        pinCode: newOrder.pinCode,
        items: newOrder.items,
        activity: newOrder.activity
      })
    });
  } catch (e) {
    console.warn('Backend sync failed, saved locally.');
  }

  return newOrder;
};

export const updateOrder = async (id, updatedData) => {
  const orders = getOrders();
  const index = orders.findIndex((o) => String(o.id) === String(id) || String(o.orderNumber).replace('#', '') === String(id));
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedData };
    saveOrders(orders);

    // Sync to Backend
    try {
      await apiRequest(`/orders/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
    } catch (e) {
      console.warn('Backend sync failed, updated locally.');
    }

    return orders[index];
  }
  return null;
};

export const deleteOrder = async (id) => {
  const orders = getOrders();
  const filtered = orders.filter((o) => String(o.id) !== String(id) && String(o.orderNumber).replace('#', '') !== String(id));
  saveOrders(filtered);

  // Sync to Backend
  try {
    await apiRequest(`/orders/remove/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Backend delete failed, removed locally.');
  }

  return filtered;
};

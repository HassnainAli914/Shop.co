import { API_BASE_URL, apiRequest } from '../../../api/client';

// ==============================|| CUSTOMER DATA & API SYNC ||============================== //

const initialCustomers = [
  {
    id: '1',
    firstName: 'Caroline',
    lastName: 'Pandolfi',
    name: 'Caroline Pandolfi',
    userName: 'caroline_pandolfi',
    email: 'caroline1@gmail.com',
    phone: '6187873453',
    countryCode: 'US',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    country: 'United States',
    city: 'New York',
    pinCode: '393010',
    address: 'Florida Square, Wouruno',
    status: 'Active',
    totalOrder: 185,
    orderValues: 7421,
    joinedDate: 'Joined 9 Sep 2026',
    notes: 'Sample description text for user profile.'
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Smith',
    name: 'Liam Smith',
    userName: 'liam_smith',
    email: 'liam2@gmail.com',
    phone: '2125551234',
    countryCode: 'US',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    country: 'United States',
    city: 'Los Angeles',
    pinCode: '90001',
    address: '842 Sunset Blvd',
    status: 'Inactive',
    totalOrder: 42,
    orderValues: 1930,
    joinedDate: 'Joined 14 Aug 2026',
    notes: 'Preferred customer for seasonal promotional campaigns.'
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Johnson',
    name: 'Emma Johnson',
    userName: 'emma_johnson',
    email: 'emma3@gmail.com',
    phone: '3105555678',
    countryCode: 'CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    country: 'Canada',
    city: 'Toronto',
    pinCode: 'M5H 2N2',
    address: '120 Queen St West',
    status: 'Active',
    totalOrder: 98,
    orderValues: 4320,
    joinedDate: 'Joined 21 Jul 2026',
    notes: 'Corporate client contact for Canadian regional office.'
  }
];

const STORAGE_KEY = 'berry_customers_exact_data';

export const getCustomers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading customers from localStorage', e);
  }
  return initialCustomers;
};

export const saveCustomers = (customers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (e) {
    console.error('Error saving customers to localStorage', e);
  }
};

export const fetchCustomersFromBackend = async () => {
  try {
    const data = await apiRequest('/customers');
    if (Array.isArray(data) && data.length > 0) {
      const formatted = data.map((c) => ({
        id: String(c.id),
        name: c.name,
        firstName: c.name?.split(' ')[0] || '',
        lastName: c.name?.split(' ').slice(1).join(' ') || '',
        userName: c.user_name || c.userName || 'user',
        email: c.email,
        phone: c.phone || '',
        location: c.location || '',
        totalOrder: Number(c.orders_count || c.totalOrder || 0),
        orderValues: Number(c.spent || c.orderValues || 0),
        avatar: c.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: c.status || 'Active',
        role: c.role || 'Customer',
        address: c.address || '',
        city: c.city || '',
        country: c.country || 'United States',
        pinCode: c.pin_code || c.pinCode || '',
        joinedDate: c.created_at ? `Joined ${new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : 'Joined 9 Sep 2026'
      }));
      saveCustomers(formatted);
      return formatted;
    }
  } catch (e) {
    // fallback
  }
  return getCustomers();
};

export const getCustomerById = (id) => {
  const customers = getCustomers();
  return customers.find((c) => String(c.id) === String(id)) || initialCustomers[0];
};

export const addCustomer = async (customer) => {
  const newId = String(Date.now());
  const newCustomer = {
    ...customer,
    id: newId,
    name: customer.name || `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
    totalOrder: customer.totalOrder || 0,
    orderValues: customer.orderValues || 0,
    joinedDate: `Joined ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
  };

  const customers = getCustomers();
  const updated = [newCustomer, ...customers];
  saveCustomers(updated);

  // Sync to Backend
  try {
    await apiRequest('/customers/add', {
      method: 'POST',
      body: JSON.stringify({
        id: newId,
        name: newCustomer.name,
        userName: newCustomer.userName,
        email: newCustomer.email,
        phone: newCustomer.phone,
        location: `${newCustomer.city || ''}, ${newCustomer.country || ''}`,
        orders_count: newCustomer.totalOrder,
        spent: newCustomer.orderValues,
        avatar: newCustomer.avatar,
        status: newCustomer.status,
        role: newCustomer.role || 'Customer',
        address: newCustomer.address,
        city: newCustomer.city,
        country: newCustomer.country,
        pin_code: newCustomer.pinCode
      })
    });
  } catch (e) {
    console.warn('Backend sync failed, saved locally.');
  }

  return newCustomer;
};

export const updateCustomer = async (id, updatedData) => {
  const customers = getCustomers();
  const index = customers.findIndex((c) => String(c.id) === String(id));
  if (index !== -1) {
    const fullName = updatedData.name || `${updatedData.firstName || customers[index].firstName || ''} ${updatedData.lastName || customers[index].lastName || ''}`.trim();
    customers[index] = { ...customers[index], ...updatedData, name: fullName };
    saveCustomers(customers);

    // Sync to Backend
    try {
      await apiRequest(`/customers/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: fullName,
          user_name: updatedData.userName,
          email: updatedData.email,
          phone: updatedData.phone,
          status: updatedData.status,
          address: updatedData.address,
          city: updatedData.city,
          country: updatedData.country,
          pin_code: updatedData.pinCode
        })
      });
    } catch (e) {
      console.warn('Backend sync failed, updated locally.');
    }

    return customers[index];
  }
  return null;
};

export const deleteCustomer = async (id) => {
  const customers = getCustomers();
  const filtered = customers.filter((c) => String(c.id) !== String(id));
  saveCustomers(filtered);

  // Sync to Backend
  try {
    await apiRequest(`/customers/remove/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Backend delete failed, removed locally.');
  }

  return filtered;
};

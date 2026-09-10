import { API_BASE_URL, apiRequest } from '../../../api/client';

// ==============================|| PRODUCT DATA & API SYNC ||============================== //

const STORAGE_KEY = 'berry_products_exact_data';

export const getProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading products from localStorage', e);
  }
  return [];
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to localStorage', e);
  }
};

export const fetchProductsFromBackend = async () => {
  try {
    const data = await apiRequest('/products');
    if (Array.isArray(data)) {
      const formatted = data.map((p) => ({
        id: String(p.id),
        name: p.name,
        sku: p.sku || p.id,
        category: p.category || 'tshirt',
        price: Number(p.price) || 0,
        costPrice: Number(p.cost_price || p.costPrice || 0),
        salePrice: `$${(Number(p.price) || 0).toFixed(2)}`,
        offerPrice: p.discountPercent > 0 ? `$${((Number(p.price) || 0) * (1 - p.discountPercent / 100)).toFixed(2)}` : `$${(Number(p.price) || 0).toFixed(2)}`,
        stock: Number(p.stock || 50),
        status: p.status || 'In Stock',
        rating: Number(p.rating || 4.5),
        reviews: Number(p.reviews || 0),
        discount: Number(p.discountPercent || p.discount || 0),
        discountPercent: Number(p.discountPercent || p.discount || 0),
        image: p.image || '',
        images: p.images || [],
        description: p.description || '',
        created: p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'
      }));
      saveProducts(formatted);
      return formatted;
    }
  } catch (e) {
    console.warn('Backend fetch failed, utilizing cached products.');
  }
  return getProducts();
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find((p) => String(p.id) === String(id) || String(p.sku) === String(id)) || null;
};

export const addProduct = async (product) => {
  const newId = product.id || String(Date.now());
  const newProduct = {
    ...product,
    id: newId,
    sku: product.sku || `SKU-${newId.slice(-6)}`,
    price: Number(product.price) || 0,
    costPrice: Number(product.costPrice) || 0,
    salePrice: `$${(Number(product.price) || 0).toFixed(2)}`,
    offerPrice: product.discount > 0 ? `$${((Number(product.price) || 0) * (1 - product.discount / 100)).toFixed(2)}` : `$${(Number(product.price) || 0).toFixed(2)}`,
    stock: Number(product.stock) || 0,
    rating: product.rating || 5.0,
    reviews: product.reviews || 0,
    status: product.stock > 0 ? (product.status || 'In Stock') : 'Out of Stock',
    created: 'Today'
  };

  const products = getProducts();
  const updated = [newProduct, ...products];
  saveProducts(updated);

  // Sync to Backend Database
  try {
    await apiRequest('/products/add', {
      method: 'POST',
      body: JSON.stringify({
        id: newId,
        name: newProduct.name,
        sku: newProduct.sku,
        price: newProduct.price,
        cost_price: newProduct.costPrice,
        discountPercent: newProduct.discount || 0,
        category: newProduct.category || 'tshirt',
        stock: newProduct.stock,
        status: newProduct.status,
        image: newProduct.image,
        description: newProduct.description
      })
    });
  } catch (e) {
    console.warn('Backend sync failed, saved locally.');
  }

  return newProduct;
};

export const updateProduct = async (id, updatedData) => {
  const products = getProducts();
  const index = products.findIndex((p) => String(p.id) === String(id) || String(p.sku) === String(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    saveProducts(products);

    // Sync to Backend Database
    try {
      await apiRequest(`/products/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
    } catch (e) {
      console.warn('Backend sync failed, updated locally.');
    }

    return products[index];
  }
  return null;
};

export const deleteProduct = async (id) => {
  const products = getProducts();
  const filtered = products.filter((p) => String(p.id) !== String(id) && String(p.sku) !== String(id));
  saveProducts(filtered);

  // Sync to Backend Database
  try {
    await apiRequest(`/products/remove/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Backend delete failed, removed locally.');
  }

  return filtered;
};

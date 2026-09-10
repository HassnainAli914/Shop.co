const supabase = require("../configs/supabase");

exports.getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

exports.getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

exports.addProduct = async (productData) => {
  const id = productData.id || Date.now().toString();
  const newProduct = {
    id,
    name: productData.name,
    sku: productData.sku || `SKU-${Date.now().toString().slice(-6)}`,
    price: Number(productData.price) || 0,
    cost_price: Number(productData.cost_price || productData.costPrice || 0),
    discountPercent: Number(productData.discountPercent || productData.discount || 0),
    category: productData.category || "tshirt",
    rating: Number(productData.rating || 4.5),
    reviews: Number(productData.reviews || 0),
    status: productData.status || "In Stock",
    stock: Number(productData.stock || 50),
    colors: productData.colors || ["Black", "Blue"],
    sizes: productData.sizes || ["S", "M", "L", "XL"],
    image: productData.image || "",
    images: productData.images || [],
    description: productData.description || "",
    userId: productData.userId || null
  };

  const { data, error } = await supabase
    .from("products")
    .insert([newProduct])
    .select();
  if (error) throw new Error(error.message);
  return data?.[0] || newProduct;
};

exports.updateProduct = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data?.[0];
};

exports.removeProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
};

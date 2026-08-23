const supabase = require("../configs/supabase");

const isSupabaseConfigured = () => {
  return process.env.SUPABASE_URL && process.env.SUPABASE_KEY;
};

let localProducts = [];

exports.getProducts = async () => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from("products").select("*");
    if (error || !data) {
      return [];
    }
    return data;
  }
  return localProducts;
};

exports.addProduct = async (name, price, userId, category = "tshirt", image = "", description = "") => {
  const newProduct = {
    id: Date.now().toString(),
    name,
    price: Number(price),
    userId,
    category,
    image: image || "",
    description: description || "",
    discountPercent: 0,
    colors: ["Black", "Blue"],
    sizes: ["S", "M", "L", "XL"]
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from("products").insert([newProduct]).select();
    if (error) throw new Error(error.message);
    return data?.[0] || newProduct;
  } else {
    localProducts.push(newProduct);
    return newProduct;
  }
};

exports.removeProduct = async (id, userId) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("userId", userId);
    if (error) throw new Error(error.message);
  } else {
    localProducts = localProducts.filter((p) => !(p.id === id && p.userId === userId));
  }
};

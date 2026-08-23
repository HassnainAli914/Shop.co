const supabase = require("../configs/supabase");

exports.getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error || !data) {
    return [];
  }
  return data;
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

  const { data, error } = await supabase.from("products").insert([newProduct]).select();
  if (error) throw new Error(error.message);
  return data?.[0] || newProduct;
};

exports.removeProduct = async (id, userId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .eq("userId", userId);
  if (error) throw new Error(error.message);
};

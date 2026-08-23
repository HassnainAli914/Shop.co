const bcrypt = require("bcrypt");
const supabase = require("../configs/supabase");

exports.createUser = async (email, password, uid) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("User Already Exists");
  }

  const hashedPass = await bcrypt.hash(password, 12);
  const { error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPass, uid }]);

  if (error) throw new Error(error.message);
};

exports.findUser = async (email) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return data;
};

const bcrypt = require("bcrypt");
const supabase = require("../configs/supabase");

const isSupabaseConfigured = () => {
  return process.env.SUPABASE_URL && process.env.SUPABASE_KEY;
};

const localUsers = [];

exports.createUser = async (email, password, uid) => {
  if (isSupabaseConfigured()) {
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
  } else {
    const matched = localUsers.find((user) => user.email === email);
    if (matched) {
      throw new Error("User Already Exists");
    }
    const hashedPass = await bcrypt.hash(password, 12);
    localUsers.push({ email, password: hashedPass, uid });
  }
};

exports.findUser = async (email) => {
  if (isSupabaseConfigured()) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    return data;
  } else {
    return localUsers.find((user) => user.email === email);
  }
};

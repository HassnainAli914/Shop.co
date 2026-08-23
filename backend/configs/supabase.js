const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://your-supabase-project.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "your-supabase-anon-key";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rfrblrwswerjmvdlvisq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcmJscndzd2Vyam12ZGx2aXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NTkxNTksImV4cCI6MjAxNTQzNTE1OX0.IE0L0HOwdqWUTYA4jXWOscNgcCVSSrn6-iGdW1U2T_0"

export const supabase = createClient(supabaseUrl, supabaseKey);
// // // export default supabase;
// // export default { supabaseKey, supabaseUrl };

// // supabaseConfig.js
// export default {
//   supabaseUrl: process.env.REACT_APP_SUPABASE_URL!,
//   supabaseKey: process.env.REACT_APP_ANON_KEY!,
// };


import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gcpkamwrzigczkfjhuqs.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcGthbXdyemlnY3prZmpodXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTkzOTksImV4cCI6MjAzODE3NTM5OX0.pn7oyIO5Et0h9_2qWlt-rSJz8x65BTy_4S5GetNSv0Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

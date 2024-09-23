import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://uzehcuqclwedpbgxbtya.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6ZWhjdXFjbHdlZHBiZ3hidHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4OTY0ODYsImV4cCI6MjAzMjQ3MjQ4Nn0.v0Fhbda031RGJqf4kVHf4WvnHz80VjaI5dcSS1Ob2Gw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

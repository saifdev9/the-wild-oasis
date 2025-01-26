import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qhmcbnhursnsvbuimytt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobWNibmh1cnNuc3ZidWlteXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMTA2MzIsImV4cCI6MjA1MjU4NjYzMn0.IakxncgFQK756aLZREwODRetxWPyyUg96uelPT7amTU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

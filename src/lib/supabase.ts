import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ykfnfikkgtbvppbadnbd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZm5maWtrZ3RidnBwYmFkbmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMDQyNDQsImV4cCI6MjA1MTc4MDI0NH0.ZaTZCzr0RMjvqz6pj5DUM1lMBhDcFP9wSV0RIiLVJ7s';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 
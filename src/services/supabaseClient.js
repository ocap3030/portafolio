import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://omkujvtezqbveriuikgw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta3VqdnRlenFidmVyaXVpa2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDgyNTIsImV4cCI6MjA3ODM4NDI1Mn0.kij5Od9C69Q0DSz3pv3pwy7cNQ7hM5IkWxZqalHlTMA'

export const supabase = createClient(supabaseUrl, supabaseKey)

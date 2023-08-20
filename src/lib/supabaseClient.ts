import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://njgcbmfhnbyylxojompu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZ2NibWZobmJ5eWx4b2pvbXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNTA0MzAsImV4cCI6MjAwNTgyNjQzMH0.RyhCRXfHe-AAigW-LL75sE1zmTJkd1Yc31CJW2WBHpc')
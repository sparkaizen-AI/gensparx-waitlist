-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserts
CREATE POLICY "Users can insert their own waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (auth.role() = 'anon');

-- Create policy for selects
CREATE POLICY "Users can view all waitlist entries" ON waitlist
  FOR SELECT USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Insert sample data (optional)
INSERT INTO waitlist (name, email) VALUES 
  ('Test User', 'test@gensparx.com'),
  ('Demo User', 'demo@gensparx.com');

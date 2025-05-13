/*
  # Create inventory table

  1. New Tables
    - `inventory`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `quantity` (integer)
      - `status` (text)
      - `priority` (text)
      - `expiry_date` (timestamptz)
      - `added_date` (timestamptz)
      - `location` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `inventory` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS public.inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  status text NOT NULL CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock', 'Reserved')),
  priority text NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
  expiry_date timestamptz,
  added_date timestamptz NOT NULL DEFAULT now(),
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read inventory
CREATE POLICY "Allow authenticated users to read inventory"
  ON public.inventory
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert inventory items
CREATE POLICY "Allow authenticated users to insert inventory items"
  ON public.inventory
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update inventory items
CREATE POLICY "Allow authenticated users to update inventory items"
  ON public.inventory
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete inventory items
CREATE POLICY "Allow authenticated users to delete inventory items"
  ON public.inventory
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
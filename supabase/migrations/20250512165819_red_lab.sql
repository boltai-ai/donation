/*
  # Fix Inventory RLS Policies

  1. Changes
    - Drop existing RLS policies on inventory table
    - Add new RLS policies that properly handle authentication
    
  2. Security
    - Enable RLS on inventory table
    - Add policies for:
      - SELECT: Allow authenticated users to read all inventory items
      - INSERT: Allow authenticated users to insert new items
      - UPDATE: Allow authenticated users to update items
      - DELETE: Allow authenticated users to delete items
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to delete inventory items" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated users to insert inventory items" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated users to read inventory" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated users to update inventory items" ON inventory;

-- Re-enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON inventory FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON inventory FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON inventory FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
ON inventory FOR DELETE
TO authenticated
USING (true);
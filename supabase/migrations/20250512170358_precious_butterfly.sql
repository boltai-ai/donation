/*
  # Fix Inventory Table RLS Policies

  1. Changes
    - Drop existing RLS policies for inventory table
    - Create new RLS policies that properly handle authentication
    - Policies created:
      - Enable read access for authenticated users
      - Enable insert access for authenticated users
      - Enable update access for authenticated users
      - Enable delete access for authenticated users

  2. Security
    - Maintains RLS enabled on inventory table
    - All operations require authentication
    - Policies use auth.uid() to verify user is authenticated
*/

-- Drop existing policies
DROP POLICY IF EXISTS "inventory_delete_policy" ON "inventory";
DROP POLICY IF EXISTS "inventory_insert_policy" ON "inventory";
DROP POLICY IF EXISTS "inventory_read_policy" ON "inventory";
DROP POLICY IF EXISTS "inventory_update_policy" ON "inventory";

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON "inventory"
FOR SELECT
TO authenticated
USING (
  auth.role() = 'authenticated'
);

CREATE POLICY "Enable insert access for authenticated users"
ON "inventory"
FOR INSERT
TO authenticated
WITH CHECK (
  auth.role() = 'authenticated'
);

CREATE POLICY "Enable update access for authenticated users"
ON "inventory"
FOR UPDATE
TO authenticated
USING (
  auth.role() = 'authenticated'
)
WITH CHECK (
  auth.role() = 'authenticated'
);

CREATE POLICY "Enable delete access for authenticated users"
ON "inventory"
FOR DELETE
TO authenticated
USING (
  auth.role() = 'authenticated'
);
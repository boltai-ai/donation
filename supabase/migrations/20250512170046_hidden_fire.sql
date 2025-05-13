/*
  # Update inventory table RLS policies

  1. Changes
    - Drop existing policies if they exist
    - Create new policies with unique names for authenticated users
    - Ensure RLS is enabled
*/

-- First drop existing policies with original names
DROP POLICY IF EXISTS "Allow authenticated users to read inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated users to insert inventory items" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated users to update inventory items" ON public.inventory;
DROP POLICY IF EXISTS "Allow authenticated users to delete inventory items" ON public.inventory;

-- Drop policies with new names in case they exist
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.inventory;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.inventory;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.inventory;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.inventory;

-- Ensure RLS is enabled
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "inventory_read_policy"
  ON public.inventory
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "inventory_insert_policy"
  ON public.inventory
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "inventory_update_policy"
  ON public.inventory
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "inventory_delete_policy"
  ON public.inventory
  FOR DELETE
  TO authenticated
  USING (true);
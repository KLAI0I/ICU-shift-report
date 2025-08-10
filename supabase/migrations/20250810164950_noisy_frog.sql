/*
  # ICU Shift Reports Database Schema

  1. New Tables
    - `icu_shift_reports`
      - `id` (uuid, primary key)
      - `mrn` (text, for filtering and searching)
      - `report_data` (jsonb, stores all form data)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `icu_shift_reports` table
    - Add policies for authenticated users to manage their own data
    - Add policy for reading reports by MRN for authorized users

  3. Indexes
    - Add index on MRN for fast searching
    - Add index on created_at for chronological sorting
*/

CREATE TABLE IF NOT EXISTS icu_shift_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mrn text NOT NULL,
  report_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE icu_shift_reports ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_icu_reports_mrn ON icu_shift_reports(mrn);
CREATE INDEX IF NOT EXISTS idx_icu_reports_created_at ON icu_shift_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_icu_reports_created_by ON icu_shift_reports(created_by);

-- RLS Policies
CREATE POLICY "Users can read all reports"
  ON icu_shift_reports
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own reports"
  ON icu_shift_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own reports"
  ON icu_shift_reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own reports"
  ON icu_shift_reports
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_icu_shift_reports_updated_at
  BEFORE UPDATE ON icu_shift_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
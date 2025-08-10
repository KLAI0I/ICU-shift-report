import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ICUShiftReport {
  id: string;
  mrn: string;
  report_data: any;
  created_at: string;
  updated_at: string;
  created_by: string;
}

// Database operations
export const saveICUReport = async (mrn: string, reportData: any) => {
  const { data, error } = await supabase
    .from('icu_shift_reports')
    .insert({
      mrn,
      report_data: reportData,
      created_by: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateICUReport = async (id: string, mrn: string, reportData: any) => {
  const { data, error } = await supabase
    .from('icu_shift_reports')
    .update({
      mrn,
      report_data: reportData
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getICUReportsByMRN = async (mrn: string) => {
  const { data, error } = await supabase
    .from('icu_shift_reports')
    .select('*')
    .eq('mrn', mrn)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAllICUReports = async () => {
  const { data, error } = await supabase
    .from('icu_shift_reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const deleteICUReport = async (id: string) => {
  const { error } = await supabase
    .from('icu_shift_reports')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
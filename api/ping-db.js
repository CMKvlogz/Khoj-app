import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://utmyossoycpywvauaccz.supabase.co',
  'sb_publishable_8f0zNxsyqPTAIFvpXXNqgg_qeSvDhit'
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('khoj_items')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.status(200).json({ status: 'ok', message: 'Supabase pinged successfully', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

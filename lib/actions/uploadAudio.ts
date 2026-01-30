import { supabase } from '../supabase';

export const uploadAudioAssessment = async (blob: Blob, userId: string, moduleId: string) => {
  const fileName = \\/\_\.webm\;
  
  // 1. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('audio-assessments')
    .upload(fileName, blob);

  if (uploadError) throw uploadError;

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('audio-assessments')
    .getPublicUrl(fileName);

  // 3. Trigger the STT and Dictionary Mapping
  // This connects to the audioProcessor.ts we built earlier
  return publicUrl;
};

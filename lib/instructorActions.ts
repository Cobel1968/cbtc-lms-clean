import { supabase } from './supabase';

export const manualMilestoneOverride = async (studentId: string, moduleId: string, reason: string) => {
  // 1. Log the evidence for the Trust Layer (Feature 4)
  const { error: logError } = await supabase
    .from('evidence_logs')
    .insert({
      student_id: studentId,
      module_id: moduleId,
      action_type: 'MANUAL_OVERRIDE',
      evidence_data: { reason, timestamp: new Date().toISOString() }
    });

  if (logError) throw logError;

  // 2. Update the student's progress
  return await supabase
    .from('student_progress')
    .update({ status: 'completed', validated_by_instructor: true })
    .match({ student_id: studentId, module_id: moduleId });
};

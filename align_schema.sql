BEGIN;
  -- Align Course naming for Bilingual Vocational Mapping
  ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS title_en TEXT;
  ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS title_fr TEXT;
  UPDATE public.courses SET title_en = name_en, title_fr = name_fr WHERE title_en IS NULL;

  -- Fix Type Mismatch for Feature 4 (Handwriting Analysis)
  ALTER TABLE public.assessment_results 
    ALTER COLUMN course_id TYPE UUID USING course_id::uuid;

  -- Add Temporal Optimization columns
  ALTER TABLE public.assessment_results 
    ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER,
    ADD COLUMN IF NOT EXISTS bilingual_friction_score NUMERIC;
COMMIT;

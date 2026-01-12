/* COBEL ENGINE SECURE RLS MANIFEST
  Resolves Linter Error 0015 (user_metadata insecure reference)
*/

-- 1. Profiles Table Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles" 
ON public.profiles FOR UPDATE TO authenticated 
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Vocational Assessments Security
ALTER TABLE public.vocational_assessments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage assessments" ON public.vocational_assessments;
CREATE POLICY "Admins can manage assessments"
ON public.vocational_assessments FOR ALL TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- [Add to database-rules.sql]
-- AUTOMATION: Auto-create profile on sign-up
-- (Include the SQL code from above here)
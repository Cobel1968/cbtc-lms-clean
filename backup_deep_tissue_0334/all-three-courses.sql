-- ========================================
-- CBTC-LMS: 3 NEW COURSES BATCH INSERTION
-- Course 1: Hospitality ESP Communication
-- Course 2: Asset Management ESP
-- Course 3: English Grammar Mastery
-- ========================================

-- COURSE 1: HOSPITALITY ESP COMMUNICATION
INSERT INTO public.courses (
  id, slug, name_en, name_fr, description_en, description_fr,
  category, level, duration_weeks, price, currency, language,
  is_published, requires_diagnostic, instructor_id, instructor_name,
  objectives_fr, objectives_en, prerequisites_fr, prerequisites_en,
  curriculum, assessment_methods, tools_required, certification_details,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'hospitality-esp-communication',
  'ESP Program: Hospitality & Customer Care Communication',
  'Programme ESP : Communication en Hôtellerie et Service Client',
  'Specialized English for hospitality professionals focusing on check-in/check-out procedures, guest services, complaint handling, and managerial communication. Progress from IELTS 4.5 to 6.5+ through practical scenarios.',
  'Anglais spécialisé pour professionnels de l''hôtellerie axé sur les procédures d''arrivée/départ, services clients, gestion des plaintes et communication managériale. Progression de IELTS 4.5 à 6.5+ via scénarios pratiques.',
  'vocational', 'intermediate', 8, 150000.00, 'XOF', 'Bilingual', false, true,
  (SELECT id FROM public.users WHERE role = 'instructor' LIMIT 1),
  'Cobel Business Training Center',
  E'• Maîtriser le vocabulaire essentiel de l''hôtellerie\n• Gérer les interactions clients avec professionnalisme\n• Traiter les plaintes diplomatiquement\n• Communiquer efficacement en contexte managérial\n• Progresser de IELTS 4.5 à 6.5+',
  E'• Master essential hospitality vocabulary\n• Handle guest interactions professionally\n• Manage complaints diplomatically\n• Communicate effectively in managerial contexts\n• Progress from IELTS 4.5 to 6.5+',
  E'• Niveau IELTS 4.5 ou équivalent\n• Expérience hôtellerie/service client\n• Participation active aux jeux de rôle\n• Accès ordinateur + internet',
  E'• IELTS 4.5 or equivalent\n• Hospitality/customer service experience\n• Active role-play participation\n• Computer + internet access',
  jsonb_build_array(
    jsonb_build_object('id', 1, 'title_en', 'Module 1: Functional Skills', 'title_fr', 'Module 1 : Compétences Fonctionnelles', 'duration', '4 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '1.1', 'title_en', 'Arrival & Check-in', 'title_fr', 'Arrivée et Enregistrement', 'content_en', 'Check-in procedures, booking confirmations, ID verification', 'content_fr', 'Procédures d''enregistrement, confirmations, vérification identité'),
        jsonb_build_object('id', '1.2', 'title_en', 'Guest Services', 'title_fr', 'Services Clients', 'content_en', 'Room service, concierge, special requests', 'content_fr', 'Service chambre, conciergerie, demandes spéciales')
      )
    ),
    jsonb_build_object('id', 2, 'title_en', 'Module 2: Relational Skills', 'title_fr', 'Module 2 : Compétences Relationnelles', 'duration', '4 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '2.1', 'title_en', 'Complaint Handling', 'title_fr', 'Gestion des Plaintes', 'content_en', 'Service recovery, conflict de-escalation', 'content_fr', 'Récupération service, désamorçage conflits')
      )
    )
  ),
  E'Role-plays, complaint simulations, written tasks, vocabulary quizzes, final practical exam',
  E'CBTC-LMS, video conferencing, bilingual glossaries, sample hotel documents',
  jsonb_build_object('title', 'ESP Hospitality Communication Certificate', 'issuer', 'CBTC', 'validation', 'Practical assessment', 'verification', 'QR code', 'validity', 'Permanent'),
  now(), now()
);

-- COURSE 2: ASSET MANAGEMENT ESP
INSERT INTO public.courses (
  id, slug, name_en, name_fr, description_en, description_fr,
  category, level, duration_weeks, price, currency, language,
  is_published, requires_diagnostic, instructor_id, instructor_name,
  objectives_fr, objectives_en, prerequisites_fr, prerequisites_en,
  curriculum, assessment_methods, tools_required, certification_details,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'asset-management-esp',
  'ESP Program: Asset Management & Operational Control',
  'Programme ESP : Gestion d''Actifs et Contrôle Opérationnel',
  'Bilingual professional training for asset managers in West Africa. Master asset registration, lifecycle management, preventive maintenance, risk control, and performance reporting in the Ivorian business context.',
  'Formation professionnelle bilingue pour gestionnaires d''actifs. Maîtrise de l''enregistrement, gestion du cycle de vie, maintenance préventive, contrôle des risques et reporting dans le contexte ivoirien.',
  'Business & Management', 'advanced', 8, 200000.00, 'XOF', 'Bilingual', false, true,
  (SELECT id FROM public.users WHERE role = 'instructor' LIMIT 1),
  'Cobel Business Training Center',
  E'• Comprendre les types d''actifs\n• Maîtriser enregistrement et inventaires\n• Maintenance préventive/corrective\n• Gérer risques de perte\n• Rapports de performance bilingues\n• Éthique et transparence\n• KPIs opérationnels',
  E'• Understand asset types\n• Master registration & inventory\n• Preventive/corrective maintenance\n• Manage loss risks\n• Bilingual performance reports\n• Ethics & transparency\n• Operational KPIs',
  E'• Anglais intermédiaire (IELTS 5.0+)\n• 2 ans expérience gestion/logistique\n• Notions comptabilité actifs\n• Accès ordinateur + internet',
  E'• Intermediate English (IELTS 5.0+)\n• 2 years management/logistics experience\n• Basic asset accounting\n• Computer + internet access',
  jsonb_build_array(
    jsonb_build_object('id', 1, 'title_en', 'Module 1: Foundations', 'title_fr', 'Module 1 : Fondements', 'duration', '3 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '1.1', 'title_en', 'Assets in Ivorian Economy', 'title_fr', 'Actifs dans l''Économie Ivoirienne', 'content_en', 'Physical, financial, operational assets', 'content_fr', 'Actifs physiques, financiers, opérationnels'),
        jsonb_build_object('id', '1.2', 'title_en', 'Registration & Inventory', 'title_fr', 'Enregistrement et Inventaire', 'content_en', 'Asset registers, tagging, reconciliation', 'content_fr', 'Registres, étiquetage, rapprochement')
      )
    ),
    jsonb_build_object('id', 2, 'title_en', 'Module 2: Performance & Risk', 'title_fr', 'Module 2 : Performance et Risque', 'duration', '3 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '2.1', 'title_en', 'Maintenance Strategies', 'title_fr', 'Stratégies de Maintenance', 'content_en', 'Preventive vs corrective, scheduling', 'content_fr', 'Préventive vs corrective, planification')
      )
    ),
    jsonb_build_object('id', 3, 'title_en', 'Module 3: Reporting & Ethics', 'title_fr', 'Module 3 : Reporting et Éthique', 'duration', '2 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '3.1', 'title_en', 'KPI Tracking', 'title_fr', 'Suivi des KPIs', 'content_en', 'Performance reports, dashboards', 'content_fr', 'Rapports de performance, tableaux de bord')
      )
    )
  ),
  E'Case studies, bilingual reports, role-plays, KPI dashboards, final asset management plan',
  E'CBTC-LMS, Excel/Sheets, PowerBI (optional), asset templates, case materials',
  jsonb_build_object('title', 'ESP Asset Management Certificate', 'issuer', 'CBTC', 'validation', 'Case studies + final plan', 'verification', 'QR code', 'validity', 'Permanent'),
  now(), now()
);

-- COURSE 3: ENGLISH GRAMMAR MASTERY
INSERT INTO public.courses (
  id, slug, name_en, name_fr, description_en, description_fr,
  category, level, duration_weeks, price, currency, language,
  is_published, requires_diagnostic, instructor_id, instructor_name,
  objectives_fr, objectives_en, prerequisites_fr, prerequisites_en,
  curriculum, assessment_methods, tools_required, certification_details,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'english-grammar-mastery',
  'English Grammar Mastery Program',
  'Programme de Maîtrise de la Grammaire Anglaise',
  'Comprehensive bilingual grammar program covering all English tenses, parts of speech, modals, conditionals, passive voice, and common error correction. Systematic progression from A1 to C1 level.',
  'Programme de grammaire bilingue complet couvrant tous les temps anglais, catégories grammaticales, modaux, conditionnels, voix passive et correction d''erreurs. Progression systématique de A1 à C1.',
  'grammar', 'beginner', 8, 120000.00, 'XOF', 'Bilingual', false, true,
  (SELECT id FROM public.users WHERE role = 'instructor' LIMIT 1),
  'Cobel Business Training Center',
  E'• Maîtriser toutes les catégories grammaticales\n• Utiliser correctement tous les temps anglais\n• Comprendre et appliquer les modaux\n• Construire les 4 types de conditionnels\n• Transformer voix active/passive\n• Identifier et corriger erreurs courantes\n• Progresser de A1 à C1',
  E'• Master all parts of speech\n• Use all English tenses correctly\n• Understand and apply modal verbs\n• Build all 4 conditional types\n• Transform active/passive voice\n• Identify and correct common errors\n• Progress from A1 to C1',
  E'• Aucun prérequis (débutants acceptés)\n• Motivation à apprendre systématiquement\n• Accès ordinateur + internet\n• 4-6 heures/semaine pour exercices',
  E'• No prerequisites (beginners welcome)\n• Motivation for systematic learning\n• Computer + internet access\n• 4-6 hours/week for exercises',
  jsonb_build_array(
    jsonb_build_object('id', 1, 'title_en', 'Module 1: Grammar Foundations', 'title_fr', 'Module 1 : Fondements Grammaticaux', 'duration', '2 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '1.1', 'title_en', 'Parts of Speech', 'title_fr', 'Catégories Grammaticales', 'content_en', 'Nouns, verbs, adjectives, adverbs, prepositions, conjunctions', 'content_fr', 'Noms, verbes, adjectifs, adverbes, prépositions, conjonctions'),
        jsonb_build_object('id', '1.2', 'title_en', 'Nouns & Articles', 'title_fr', 'Noms et Articles', 'content_en', 'Countable/uncountable, articles a/an/the', 'content_fr', 'Dénombrables/indénombrables, articles a/an/the')
      )
    ),
    jsonb_build_object('id', 2, 'title_en', 'Module 2: Verbs & Tenses', 'title_fr', 'Module 2 : Verbes et Temps', 'duration', '3 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '2.1', 'title_en', 'Regular & Irregular Verbs', 'title_fr', 'Verbes Réguliers et Irréguliers', 'content_en', 'Base, past, past participle forms', 'content_fr', 'Formes base, passé, participe passé'),
        jsonb_build_object('id', '2.2', 'title_en', 'All English Tenses', 'title_fr', 'Tous les Temps Anglais', 'content_en', 'Present, past, future (simple, continuous, perfect, perfect continuous)', 'content_fr', 'Présent, passé, futur (simple, continu, perfect, perfect continu)')
      )
    ),
    jsonb_build_object('id', 3, 'title_en', 'Module 3: Functional Grammar', 'title_fr', 'Module 3 : Grammaire Fonctionnelle', 'duration', '2 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '3.1', 'title_en', 'Modal Verbs', 'title_fr', 'Verbes Modaux', 'content_en', 'Can, could, may, might, must, should, will, would', 'content_fr', 'Can, could, may, might, must, should, will, would'),
        jsonb_build_object('id', '3.2', 'title_en', 'Conditionals', 'title_fr', 'Conditionnels', 'content_en', 'Zero, first, second, third conditionals', 'content_fr', 'Conditionnels zéro, premier, deuxième, troisième')
      )
    ),
    jsonb_build_object('id', 4, 'title_en', 'Module 4: Advanced Control', 'title_fr', 'Module 4 : Contrôle Avancé', 'duration', '1 week',
      'lessons', jsonb_build_array(
        jsonb_build_object('id', '4.1', 'title_en', 'Passive Voice', 'title_fr', 'Voix Passive', 'content_en', 'Active to passive transformation, all tenses', 'content_fr', 'Transformation actif/passif, tous les temps'),
        jsonb_build_object('id', '4.2', 'title_en', 'Error Correction & Mastery', 'title_fr', 'Correction d''Erreurs et Maîtrise', 'content_en', 'False friends, common mistakes, sentence rewriting', 'content_fr', 'Faux amis, erreurs courantes, réécriture de phrases')
      )
    )
  ),
  E'Grammar quizzes (weekly), sentence transformation exercises, error correction tasks, tense usage assessments, final comprehensive exam',
  E'CBTC-LMS platform, grammar workbook (digital), bilingual reference materials, practice exercises, internet connection',
  jsonb_build_object('title', 'CBTC English Grammar Mastery Certificate', 'issuer', 'Cobel Business Training Center', 'validation', 'Comprehensive grammar exam (all modules)', 'verification', 'Digital certificate with QR code', 'validity', 'Permanent', 'recognized_by', 'CBTC-LMS verified'),
  now(), now()
);

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
SELECT 
  id, 
  slug, 
  name_en, 
  category, 
  level, 
  duration_weeks, 
  price,
  is_published
FROM public.courses 
WHERE slug IN (
  'hospitality-esp-communication',
  'asset-management-esp',
  'english-grammar-mastery'
)
ORDER BY slug;
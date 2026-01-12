-- HOSPITALITY ESP COURSE INSERTION
-- Course: ESP Program: Hospitality & Customer Care Communication

INSERT INTO public.courses (
  id,
  slug,
  name_en,
  name_fr,
  description_en,
  description_fr,
  category,
  level,
  duration_weeks,
  price,
  currency,
  language,
  is_published,
  requires_diagnostic,
  instructor_id,
  instructor_name,
  objectives_fr,
  objectives_en,
  prerequisites_fr,
  prerequisites_en,
  curriculum,
  assessment_methods,
  tools_required,
  certification_details,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'hospitality-esp-communication',
  'ESP Program: Hospitality & Customer Care Communication',
  'Programme ESP : Communication en Hôtellerie et Service Client',
  'Specialized English for hospitality professionals focusing on check-in/check-out procedures, guest services, complaint handling, and managerial communication. Progress from IELTS 4.5 to 6.5+ through practical scenarios.',
  'Anglais spécialisé pour professionnels de l''hôtellerie axé sur les procédures d''arrivée/départ, services clients, gestion des plaintes et communication managériale. Progression de IELTS 4.5 à 6.5+ via scénarios pratiques.',
  'vocational',
  'intermediate',
  8,
  150000.00,
  'XOF',
  'Bilingual',
  false,
  true,
  (SELECT id FROM public.users WHERE role = 'instructor' LIMIT 1),
  'Cobel Business Training Center',
  E' Maîtriser le vocabulaire essentiel de l''hôtellerie (check-in, facturation, services)\n Gérer les interactions clients avec aisance et professionnalisme\n Traiter les plaintes et situations difficiles avec diplomatie\n Communiquer efficacement dans un contexte managérial\n Progresser du niveau IELTS 4.5 au niveau 6.5+',
  E' Master essential hospitality vocabulary (check-in, billing, services)\n Handle guest interactions with ease and professionalism\n Manage complaints and difficult situations diplomatically\n Communicate effectively in managerial contexts\n Progress from IELTS 4.5 to 6.5+ level',
  E' Niveau d''anglais minimum : IELTS 4.5 ou équivalent\n Expérience dans l''hôtellerie ou le service client (souhaitable)\n Engagement à participer activement aux jeux de rôle\n Accès à un ordinateur avec connexion internet',
  E' Minimum English level: IELTS 4.5 or equivalent\n Experience in hospitality or customer service (desirable)\n Commitment to active participation in role-plays\n Access to computer with internet connection',
  jsonb_build_array(
    jsonb_build_object(
      'id', 1,
      'title_en', 'Module 1: Functional Skills',
      'title_fr', 'Module 1 : Compétences Fonctionnelles',
      'duration', '4 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object(
          'id', '1.1',
          'title_en', 'Arrival & Check-in Essentials',
          'title_fr', 'Arrivée et Procédures d''Enregistrement',
          'content_en', 'Master check-in procedures, booking confirmations, ID verification, room assignments, and payment processing.',
          'content_fr', 'Maîtriser les procédures d''enregistrement, confirmations de réservation, vérification d''identité, attribution des chambres et traitement des paiements.'
        ),
        jsonb_build_object(
          'id', '1.2',
          'title_en', 'Guest Services & Requests',
          'title_fr', 'Services Clients et Demandes',
          'content_en', 'Handle room service, wake-up calls, concierge requests, and special accommodations.',
          'content_fr', 'Gérer le service en chambre, appels de réveil, demandes de conciergerie et accommodations spéciales.'
        ),
        jsonb_build_object(
          'id', '1.3',
          'title_en', 'Checkout & Billing',
          'title_fr', 'Départ et Facturation',
          'content_en', 'Process checkouts, explain invoices, handle payment disputes, and gather feedback.',
          'content_fr', 'Traiter les départs, expliquer les factures, gérer les litiges de paiement et recueillir les commentaires.'
        ),
        jsonb_build_object(
          'id', '1.4',
          'title_en', 'Restaurant & Food Service Communication',
          'title_fr', 'Communication Restaurant et Service Alimentaire',
          'content_en', 'Take orders, explain menu items, handle dietary restrictions, and process payments.',
          'content_fr', 'Prendre les commandes, expliquer les articles du menu, gérer les restrictions alimentaires et traiter les paiements.'
        )
      )
    ),
    jsonb_build_object(
      'id', 2,
      'title_en', 'Module 2: Relational & Managerial Skills',
      'title_fr', 'Module 2 : Compétences Relationnelles et Managériales',
      'duration', '4 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object(
          'id', '2.1',
          'title_en', 'Complaint Handling & Service Recovery',
          'title_fr', 'Gestion des Plaintes et Récupération du Service',
          'content_en', 'Apply service recovery techniques, de-escalate conflicts, and turn complaints into opportunities.',
          'content_fr', 'Appliquer les techniques de récupération du service, désamorcer les conflits et transformer les plaintes en opportunités.'
        ),
        jsonb_build_object(
          'id', '2.2',
          'title_en', 'Cross-Cultural Communication',
          'title_fr', 'Communication Interculturelle',
          'content_en', 'Navigate cultural differences, adapt communication styles, and provide culturally sensitive service.',
          'content_fr', 'Naviguer les différences culturelles, adapter les styles de communication et fournir un service culturellement sensible.'
        ),
        jsonb_build_object(
          'id', '2.3',
          'title_en', 'Team Coordination & Shift Handovers',
          'title_fr', 'Coordination d''Équipe et Passations de Service',
          'content_en', 'Conduct effective shift briefings, document incidents, and coordinate with departments.',
          'content_fr', 'Mener des briefings de service efficaces, documenter les incidents et coordonner avec les départements.'
        ),
        jsonb_build_object(
          'id', '2.4',
          'title_en', 'Professional Email & Written Communication',
          'title_fr', 'Email Professionnel et Communication Écrite',
          'content_en', 'Write professional emails, confirmation letters, apology letters, and incident reports.',
          'content_fr', 'Rédiger des emails professionnels, lettres de confirmation, lettres d''excuse et rapports d''incident.'
        )
      )
    )
  ),
  E' Role-play assessments (check-in/checkout scenarios)\n Complaint handling simulations\n Written communication tasks (emails, reports)\n Vocabulary quizzes (bilingual)\n Final practical examination (multi-scenario assessment)\n Peer evaluation of communication skills',
  E' CBTC-LMS platform\n Video conferencing tools (for live role-plays)\n Bilingual glossaries (EN/FR)\n Sample hotel documents (invoices, menus, policies)\n Recording device (for pronunciation practice)\n Internet connection',
  jsonb_build_object(
    'title', 'ESP Hospitality & Customer Care Communication Certificate',
    'issuer', 'Cobel Business Training Center',
    'validation', 'Skill-based assessment + Final practical exam',
    'verification', 'Digital certificate with QR code',
    'validity', 'Permanent',
    'recognized_by', 'Hospitality industry employers'
  ),
  now(),
  now()
);

-- Verify insertion
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
WHERE slug = 'hospitality-esp-communication';
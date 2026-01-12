-- ASSET MANAGEMENT ESP COURSE INSERTION
-- Course: ESP Program: Asset Management & Operational Control

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
  'asset-management-esp',
  'ESP Program: Asset Management & Operational Control',
  'Programme ESP : Gestion d''Actifs et Contrôle Opérationnel',
  'Bilingual professional training for asset managers in West Africa. Master asset registration, lifecycle management, preventive maintenance, risk control, and performance reporting in the Ivorian business context (SMEs, infrastructure, logistics, hospitality, agribusiness).',
  'Formation professionnelle bilingue pour gestionnaires d''actifs en Afrique de l''Ouest. Maîtrise de l''enregistrement des actifs, gestion du cycle de vie, maintenance préventive, contrôle des risques et reporting de performance dans le contexte ivoirien (PME, infrastructures, logistique, hôtellerie, agro-industrie).',
  'Business & Management',
  'advanced',
  8,
  200000.00,
  'XOF',
  'Bilingual',
  false,
  true,
  (SELECT id FROM public.users WHERE role = 'instructor' LIMIT 1),
  'Cobel Business Training Center',
  E'• Comprendre les types d''actifs dans l''économie ivoirienne\n• Maîtriser l''enregistrement et le contrôle des inventaires\n• Distinguer maintenance préventive et corrective\n• Gérer les risques de perte et détournement d''actifs\n• Produire des rapports de performance bilingues\n• Appliquer l''éthique et la transparence dans la gestion d''actifs\n• Utiliser les KPIs pour le contrôle opérationnel',
  E'• Understand asset types in the Ivorian economy\n• Master asset registration and inventory control\n• Distinguish preventive vs corrective maintenance\n• Manage asset loss and misuse risks\n• Produce bilingual performance reports\n• Apply ethics and transparency in asset management\n• Use KPIs for operational control',
  E'• Niveau d''anglais : Intermédiaire (IELTS 5.0+ ou équivalent)\n• Expérience en gestion, logistique, ou opérations (2 ans minimum)\n• Connaissance de base en comptabilité (actifs/immobilisations)\n• Accès à un ordinateur avec connexion internet',
  E'• English level: Intermediate (IELTS 5.0+ or equivalent)\n• Experience in management, logistics, or operations (minimum 2 years)\n• Basic accounting knowledge (assets/fixed assets)\n• Access to computer with internet connection',
  jsonb_build_array(
    jsonb_build_object(
      'id', 1,
      'title_en', 'Module 1: Foundations of Asset Management',
      'title_fr', 'Module 1 : Fondements de la Gestion d''Actifs',
      'duration', '3 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object(
          'id', '1.1',
          'title_en', 'Understanding Assets in the Ivorian Economy',
          'title_fr', 'Comprendre les Actifs dans l''Économie Ivoirienne',
          'content_en', 'Physical, financial, and operational assets. Examples from Abidjan/San Pedro ports, hotels, transport fleets, agro-industrial plants.',
          'content_fr', 'Actifs physiques, financiers et opérationnels. Exemples des ports d''Abidjan/San Pedro, hôtels, flottes de transport, usines agro-industrielles.'
        ),
        jsonb_build_object(
          'id', '1.2',
          'title_en', 'Asset Registration & Inventory Control',
          'title_fr', 'Enregistrement d''Actifs et Contrôle des Inventaires',
          'content_en', 'Asset registers, tagging systems, inventory reconciliation, and documentation practices.',
          'content_fr', 'Registres d''actifs, systèmes d''étiquetage, rapprochement d''inventaire et pratiques de documentation.'
        ),
        jsonb_build_object(
          'id', '1.3',
          'title_en', 'Asset Lifecycle & Depreciation',
          'title_fr', 'Cycle de Vie des Actifs et Amortissement',
          'content_en', 'Acquisition, utilization, maintenance, disposal, and depreciation accounting.',
          'content_fr', 'Acquisition, utilisation, maintenance, cession et comptabilité de l''amortissement.'
        )
      )
    ),
    jsonb_build_object(
      'id', 2,
      'title_en', 'Module 2: Asset Performance, Risk & Maintenance',
      'title_fr', 'Module 2 : Performance, Risque et Maintenance des Actifs',
      'duration', '3 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object(
          'id', '2.1',
          'title_en', 'Preventive vs Corrective Maintenance',
          'title_fr', 'Maintenance Préventive vs Corrective',
          'content_en', 'Maintenance strategies, scheduling, downtime minimization. Case study: transport fleet maintenance during rainy seasons.',
          'content_fr', 'Stratégies de maintenance, planification, minimisation des temps d''arrêt. Étude de cas : maintenance de flottes pendant les saisons pluvieuses.'
        ),
        jsonb_build_object(
          'id', '2.2',
          'title_en', 'Risk, Loss & Misuse of Assets',
          'title_fr', 'Risques, Pertes et Détournements d''Actifs',
          'content_en', 'Theft prevention, misuse detection, insurance, security protocols. Scenario: missing equipment on construction sites.',
          'content_fr', 'Prévention du vol, détection de détournement, assurance, protocoles de sécurité. Scénario : équipements manquants sur chantiers.'
        ),
        jsonb_build_object(
          'id', '2.3',
          'title_en', 'Asset Performance Metrics',
          'title_fr', 'Indicateurs de Performance des Actifs',
          'content_en', 'KPIs: utilization rate, maintenance cost ratio, asset turnover, ROI tracking.',
          'content_fr', 'KPIs : taux d''utilisation, ratio de coût de maintenance, rotation des actifs, suivi du ROI.'
        )
      )
    ),
    jsonb_build_object(
      'id', 3,
      'title_en', 'Module 3: Reporting, Ethics & Strategic Control',
      'title_fr', 'Module 3 : Reporting, Éthique et Contrôle Stratégique',
      'duration', '2 weeks',
      'lessons', jsonb_build_array(
        jsonb_build_object(
          'id', '3.1',
          'title_en', 'Asset Reporting & KPI Tracking',
          'title_fr', 'Reporting d''Actifs et Suivi des KPIs',
          'content_en', 'Drafting bilingual asset performance reports for investors and management. Dashboard design.',
          'content_fr', 'Rédaction de rapports de performance d''actifs bilingues pour investisseurs et direction. Conception de tableaux de bord.'
        ),
        jsonb_build_object(
          'id', '3.2',
          'title_en', 'Ethics, Accountability & Cultural Realities',
          'title_fr', 'Éthique, Responsabilité et Réalités Culturelles',
          'content_en', 'Transparency, institutional trust, managing assets in environments with informal practices. Anti-corruption measures.',
          'content_fr', 'Transparence, confiance institutionnelle, gestion d''actifs dans des environnements avec pratiques informelles. Mesures anti-corruption.'
        ),
        jsonb_build_object(
          'id', '3.3',
          'title_en', 'Strategic Asset Planning',
          'title_fr', 'Planification Stratégique des Actifs',
          'content_en', 'Long-term asset strategy, capital budgeting, replacement planning, and investment justification.',
          'content_fr', 'Stratégie d''actifs à long terme, budgétisation du capital, planification de remplacement et justification d''investissement.'
        )
      )
    )
  ),
  E'• Case study presentations (asset management scenarios)\n• Bilingual report writing (asset performance, risk analysis)\n• Role-play assessments (inventory control, maintenance planning)\n• KPI dashboard creation (Excel/PowerBI)\n• Ethics discussion participation\n• Final project: comprehensive asset management plan',
  E'• CBTC-LMS platform\n• Excel/Google Sheets (for inventory tracking)\n• PowerBI or Tableau (optional, for dashboards)\n• Sample asset registers and templates\n• Case study materials (Ivorian business contexts)\n• Internet connection',
  jsonb_build_object(
    'title', 'ESP Asset Management & Operational Control Certificate',
    'issuer', 'Cobel Business Training Center',
    'validation', 'Case studies + Final asset management plan',
    'verification', 'Digital certificate with QR code',
    'validity', 'Permanent',
    'recognized_by', 'SMEs, infrastructure firms, logistics companies in West Africa'
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
WHERE slug = 'asset-management-esp';
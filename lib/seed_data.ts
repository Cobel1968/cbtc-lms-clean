export const courseInflation = [
  {
    id: "vocal-tech-01",
    title: "Maintenance Industrielle & Bilinguisme",
    modules: [
      { id: "m1", title: "Diagnostic et Terminologie", questionCount: 60 },
      { id: "m2", title: "Sécurité et Protocoles", questionCount: 70 },
      { id: "m3", title: "Rapport de Conformité", questionCount: 61 }
    ]
  }
];

// Placeholder for the 191 questions structure
// Logic: Each question tracks 'technical_term' for the Bilingual Mapping Feature
export const questionBank = Array.from({ length: 191 }, (_, i) => ({
  id: `q-${i + 1}`,
  course_id: "vocal-tech-01",
  text_fr: `Question technique ${i + 1} en Français...`,
  text_en: `Technical question ${i + 1} in English...`,
  technical_term: i % 2 === 0 ? "Circuit Breaker" : "Disjoncteur",
  category: i < 60 ? "Diagnostic" : i < 130 ? "Safety" : "Reporting",
  difficulty: (i % 3) + 1 // 1: Basic, 2: Intermediate, 3: Expert
}));
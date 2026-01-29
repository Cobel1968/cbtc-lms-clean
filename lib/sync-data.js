const { createClient } = require('@supabase/supabase-client');
// Ensure these match your actual environment variables
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_SERVICE_ROLE_KEY');

const technicalNodes = [
  {
    title_en: "Advanced Syntax & Clause Logic",
    description: JSON.stringify([
      { "TEXT_EN": "Technical Assessment: Advanced Syntax - Item 1", "TEXT_FR": "Évaluation technique: Syntaxe Avancée - Élément 1" },
      { "TEXT_EN": "Complex Clause Structures", "TEXT_FR": "Structures de Propositions Complexes" },
      { "TEXT_EN": "Linguistic Logic Nodes", "TEXT_FR": "Nœuds de Logique Linguistique" }
    ])
  },
  {
    title_en: "Strategic Audit & Assurance (Advanced)",
    description: JSON.stringify([
      { "TEXT_EN": "Audit Integrity Mapping", "TEXT_FR": "Cartographie de l'Intégrité de l'Audit" },
      { "TEXT_EN": "Risk Assessment Frameworks", "TEXT_FR": "Cadres d'Évaluation des Risques" },
      { "TEXT_EN": "Regulatory Compliance Nodes", "TEXT_FR": "Nœuds de Conformité Réglementaire" }
    ])
  }
];

async function sync() {
  console.log(" Initializing Bilingual Vocational Mapping Sync...");
  for (const node of technicalNodes) {
    const { error } = await supabase
      .from('modules')
      .update({ description: node.description })
      .eq('title_en', node.title_en);
    
    if (error) console.error(` Error syncing ${node.title_en}:`, error.message);
    else console.log(` Synced: ${node.title_en}`);
  }
}

sync();
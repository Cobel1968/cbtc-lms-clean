/**
 * Innovation: Bilingual Vocational Mapping (Onboarding)
 * Author: Abel C.
 * Purpose: Automated student onboarding with unique technical ID generation.
 */

export interface InvitationData {
  studentName: string;
  studentId: string;
  initialCourse: string;
  assessmentLink: string;
}

export const generateBilingualInvite = (data: InvitationData, lang: 'en' | 'fr') => {
  const content = {
    en: {
      subject: `Welcome to Cobel BTC - Your Training Path: ${data.initialCourse}`,
      greeting: `Hello ${data.studentName},`,
      body: `Your unique Technical ID is **${data.studentId}**. Your learning path has been initialized with our Dynamic Path Mapping engine.`,
      action: "Please upload your first handwritten vocational assessment to begin.",
      button: "Start Assessment"
    },
    fr: {
      subject: `Bienvenue à Cobel BTC - Votre Parcours : ${data.initialCourse}`,
      greeting: `Bonjour ${data.studentName},`,
      body: `Votre ID Technique unique est **${data.studentId}**. Votre parcours a été initialisé via notre moteur de cartographie dynamique.`,
      action: "Veuillez télécharger votre première évaluation technique manuscrite pour commencer.",
      button: "Commencer l'évaluation"
    }
  };

  return content[lang];
};
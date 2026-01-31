# Cobel Business Training Center (LMS)
## Project: Cobel AI Engine
**Author:** Abel C.  
**Status:** MVP - Standards Validated

### 🚀 Core Innovations
This system solves the technical problem of knowledge gaps and bilingual friction in vocational training through:
1. **Multi-Dimensional Diagnostic:** Ingests physical handwriting (OCR) and verbal reports (Audio) to identify technical terms in English and French.
2. **Dynamic Path Mapping:** Uses a custom PostgreSQL View (`student_competency_matrix`) to update student progress in real-time.
3. **Temporal Optimization:** Automatically adjusts predicted graduation dates based on validated technical mastery or missed sessions.
4. **Analog-to-Digital Pedagogical Bridge:** A specialized module for technical term extraction from field assessments.

### 🛠️ Technical Stack
- **Frontend/Hosting:** Next.js / Vercel
- **Database:** Supabase (PostgreSQL)
- **Logic Engine:** TypeScript / Node.js
- **Verification:** Bilingual Vocational Mapping (FR/EN)

### 🏥 Safety & Governance
- **Surgeon's Rollback:** All logic is derived from atomic evidence logs, allowing for instant data correction without state corruption.
- **Strict Compliance:** Diplomas are only eligible for generation once the AI Engine confirms 100% mastery of all CBTC standards.
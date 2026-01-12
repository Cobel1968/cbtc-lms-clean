# 🚀 Cobel Business Training Center (LMS)
### Project: Cobel AI Engine v2.7

**Author:** Abel C.  
**Innovation Type:** Computer-Implemented Pedagogical Logic / Adaptive Learning Algorithm  
**Market Focus:** Vocational Training (Hospitality/Trade) - Côte d'Ivoire (XOF)

---

## 💡 The Core Problem
Traditional vocational training suffers from three critical inefficiencies:
1. **Knowledge Gaps:** Generalized curricula fail to address specific student needs.
2. **Time Waste:** Fixed-duration courses ignore individual learning speeds.
3. **Bilingual Friction:** Difficulty transitioning technical terms between English and French.

## 🛠 Technical Solutions (The Cobel Engine)

### 1. Multi-Dimensional Diagnostic & Path Mapping
The engine replaces rigid schedules with an **Adaptive Milestone Forecast**. It calculates a **Speed Index** and **Time Saved** metric, dynamically re-routing the student's path based on real-time mastery.

### 2. Analog-to-Digital Pedagogical Bridge (Feature 4)
A proprietary **Handwriting Analysis Module** that allows for the ingestion of physical, handwritten vocational assessments.
- **Process:** OCR pre-processing → Contextual extraction → Technical fluency scoring.
- **Result:** Automatically updates the student's **Technical Fluency** and **Curriculum Density** without manual entry.



### 3. Temporal Optimization (Phase 3)
The engine calculates an **Optimized Duration Weeks** metric. If a student demonstrates high technical fluency via handwriting ingestion, the system compresses a standard 12-week path (e.g., Smart Contracts) into an 8-week accelerated track.

---

## 📁 System Architecture (Vercel-Ready)

We maintain a strict **lowercase/no-hyphen** naming convention for Vercel/Linux build stability.

### Core Modules
- `lib/supabaseclient.ts`: Typed client for AI engine integration.
- `lib/ocr/handwritinglogic.ts`: The Analog-to-Digital extraction logic.
- `lib/ocr/temporaloptimization.ts`: Curriculum compression algorithm.

### UI Components
- `components/dashboard/coursegrid.tsx`: Bilingual vocational catalog.
- `components/dashboard/trainerview.tsx`: Physical-to-Digital payment verification.
- `components/dashboard/optimizationsuccess.tsx`: Time-savings visualizer.

---

## 🚀 Getting Started (Development)

First, configure your environment variables in Vercel or your `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
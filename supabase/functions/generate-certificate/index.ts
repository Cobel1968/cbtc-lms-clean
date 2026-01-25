import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// THE BILINGUAL CERTIFICATE TEMPLATE
const HTML_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Helvetica', sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f8fafc; }
        .cert-container { width: 800px; height: 580px; padding: 40px; border: 15px solid #1e40af; background: white; position: relative; color: #1e293b; text-align: center; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); }
        .header h1 { color: #1e40af; font-size: 32px; margin-bottom: 5px; }
        .header p { text-transform: uppercase; letter-spacing: 3px; font-weight: bold; font-size: 12px; color: #64748b; margin-top: 0; }
        .student-name { font-size: 42px; font-weight: 900; margin: 30px 0; border-bottom: 2px solid #e2e8f0; display: inline-block; padding: 0 20px 10px 20px; color: #0f172a; }
        .course-info { margin-top: 20px; }
        .course-en { color: #2563eb; font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .course-fr { color: #94a3b8; font-size: 20px; font-style: italic; margin-top: 0; }
        .metrics { margin-top: 40px; display: flex; justify-content: center; gap: 50px; background: #f1f5f9; padding: 20px; border-radius: 15px; }
        .metric-box p { margin: 0; }
        .metric-label { font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold; }
        .metric-value { font-size: 28px; font-weight: 900; color: #1e40af; }
        .delta { color: #16a34a; }
        .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; }
        .signature { border-top: 1px solid #000; padding-top: 5px; width: 150px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="cert-container">
        <div class="header">
            <h1>COBEL BUSINESS TRAINING CENTER</h1>
            <p>Vocational Excellence Certificate</p>
        </div>
        
        <p style="margin-top: 40px; font-style: italic; color: #64748b;">This is to certify that / Ceci certifie que</p>
        <div class="student-name">{{STUDENT_NAME}}</div>

        <div class="course-info">
            <p style="color: #64748b;">Has successfully completed the course / A réussi le cours</p>
            <div class="course-en">{{COURSE_NAME_EN}}</div>
            <div class="course-fr">{{COURSE_NAME_FR}}</div>
        </div>

        <div class="metrics">
            <div class="metric-box">
                <p class="metric-label">Learning Delta</p>
                <p class="metric-value delta">+{{DELTA}}%</p>
            </div>
            <div class="metric-box">
                <p class="metric-label">Technical Fluency</p>
                <p class="metric-value">{{FLUENCY}}%</p>
            </div>
        </div>

        <div class="footer">
            <div style="text-align: left;">
                <p>Credential ID: {{CERT_ID}}</p>
                <p>Issue Date: {{DATE}}</p>
            </div>
            <div>
                <div class="signature">Director of Pedagogy</div>
            </div>
        </div>
    </div>
</body>
</html>
`;

serve(async (req) => {
  const { enrollment_id } = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 1. Fetch Enrollment and linked Course/Results
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(*),
      user:profiles(*),
      results:diagnostic_results(*)
    `)
    .eq('id', enrollment_id)
    .single()

  if (error || !enrollment) return new Response("Enrollment not found", { status: 404 })

  // 2. PEDAGOGICAL VALIDATION LOGIC
  const preTest = enrollment.results.find((r: any) => r.test_type === 'pre-test')
  const postTest = enrollment.results.find((r: any) => r.test_type === 'post-test')

  if (!preTest || !postTest) {
    return new Response("Both Pre and Post tests required", { status: 400 })
  }

  const delta = postTest.score - preTest.score
  const minDelta = enrollment.course.min_progress_delta

  // 3. CERTIFICATE GATE
  if (postTest.score < 70 || delta < minDelta) {
    return new Response(`Certification denied. Delta (${delta}) < Min (${minDelta})`, { status: 403 })
  }

  // 4. INJECT DATA INTO TEMPLATE
  const studentName = `${enrollment.user.first_name || ''} ${enrollment.user.last_name || ''}`.trim() || enrollment.user.email;
  
  const finalHtml = HTML_TEMPLATE
    .replace('{{STUDENT_NAME}}', studentName)
    .replace('{{COURSE_NAME_EN}}', enrollment.course.name.en)
    .replace('{{COURSE_NAME_FR}}', enrollment.course.name.fr)
    .replace('{{DELTA}}', delta.toString())
    .replace('{{FLUENCY}}', (postTest.technical_fluency_score || 0).toString())
    .replace('{{CERT_ID}}', enrollment_id.substring(0, 8).toUpperCase())
    .replace('{{DATE}}', new Date().toLocaleDateString('en-GB'));

  // 5. UPDATE STORAGE & ENROLLMENT (Simulating PDF storage path)
  const certificateUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/certificates/${enrollment_id}.pdf`

  await supabase
    .from('enrollments')
    .update({ 
      status: 'completed', 
      progress_validated: true,
      certificate_url: certificateUrl 
    })
    .eq('id', enrollment_id)

  // Return the data needed for the frontend to render/print or the raw HTML for a PDF service
  return new Response(JSON.stringify({ 
    url: certificateUrl,
    html: finalHtml, // This can be sent to a PDF conversion API
    delta: delta 
  }), {
    headers: { "Content-Type": "application/json" },
  })
})

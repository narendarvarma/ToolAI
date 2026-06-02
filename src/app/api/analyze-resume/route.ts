import { NextRequest, NextResponse } from "next/server"
import { generateAIResponse } from "@/lib/ai-provider"

const SYSTEM_PROMPT = `You are an expert resume analyst and career coach with 15+ years of experience in HR and recruitment.

Analyze the resume and return a structured report using EXACTLY these headers (bold, all caps):

**OVERALL SCORE: X/100**
Honest score out of 100.

**QUICK SUMMARY**
2-3 sentences on overall strength and first impression.

**STRENGTHS ✅**
List 4-5 specific strengths with brief explanations.

**WEAKNESSES ❌**
List 4-5 specific weaknesses with clear reasons.

**ATS COMPATIBILITY SCORE: X/100**
Rate ATS compatibility. List missing or weak keywords.

**SECTION-BY-SECTION ANALYSIS**
For each section present (Contact, Summary, Experience, Education, Skills, Projects, Certifications):
- Rating: Good / Average / Weak
- 1-2 specific suggestions

**IMPACT & ACTION VERBS**
Show 3 real improvement examples from THIS resume:
❌ Original weak bullet from resume
✅ Improved version with metrics

**MISSING SECTIONS**
List important sections that are absent.

**TOP 5 IMPROVEMENTS (Priority Order)**
Numbered list, most impactful changes first.

**INDUSTRY FIT**
2-3 best-fit job roles or industries based on the resume.

Rules:
- Be honest and specific. Never generic.
- Never make up information not in the resume.
- Always use the exact bold headers above.`

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json()

    if (!resumeText?.trim()) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      )
    }

    const { reply, model, error } = await generateAIResponse(
      [{ role: "user", content: `Please analyze this resume:\n\n${resumeText}` }],
      SYSTEM_PROMPT,
      2500
    )

    if (error || !reply) {
      return NextResponse.json(
        { error: error || "ToolAI busy" },
        { status: 503 }
      )
    }

    return NextResponse.json({ result: reply, model })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

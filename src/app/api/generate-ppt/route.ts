import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/ai-provider'

export async function POST(req: NextRequest) {
  const { topic, slideCount = 8, style = 'professional' } = await req.json()

  if (!topic?.trim()) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
  }

  const prompt = `
You are an expert presentation designer and content strategist.

TASK: Generate a complete PowerPoint presentation in structured JSON format.

STRICT RULES:
1. Return ONLY valid JSON. No markdown, no backticks, no explanation, no preamble, no trailing text.
2. Start your response with { and end with } — nothing outside the JSON object.
3. Generate exactly ${slideCount} slides.
4. Every slide MUST have a different layout — never repeat the same layout twice in a row.
5. Use these layouts in order: "title", "bullets", "two-column", "big-stat", "quote", "timeline", "grid", "closing".
6. Bullet points must start with a strong action verb and be max 10 words each.
7. Stats must be real-sounding numbers with a label and one-line context.
8. Quotes must sound real and have a believable name + title attribution.
9. Grid cards must each have a unique emoji icon, bold title, and 1-sentence description.
10. Timeline steps must be sequential and logical like a real process or roadmap.
11. colorTheme must be exactly one of: midnight-navy | forest-green | coral-energy | teal-trust | cherry-bold
12. Pick the colorTheme that best matches the topic mood and industry.
13. Speaker notes must sound like what a confident presenter would actually say out loud.
14. Every single slide must have the "icon" field filled with one relevant emoji.
15. Never leave any field empty — every field must have a real value.

OUTPUT this exact JSON structure and nothing else:
{
  "title": "",
  "subtitle": "",
  "author": "Prepared by AI",
  "colorTheme": "",
  "font": {
    "heading": "Georgia",
    "body": "Calibri"
  },
  "slides": [
    {
      "slideNumber": 1,
      "layout": "title",
      "icon": "",
      "heading": "",
      "subheading": "",
      "speakerNotes": ""
    },
    {
      "slideNumber": 2,
      "layout": "bullets",
      "icon": "",
      "heading": "",
      "bullets": ["", "", "", "", ""],
      "speakerNotes": ""
    },
    {
      "slideNumber": 3,
      "layout": "two-column",
      "icon": "",
      "heading": "",
      "leftColumn": { "title": "", "points": ["", "", "", ""] },
      "rightColumn": { "title": "", "points": ["", "", "", ""] },
      "speakerNotes": ""
    },
    {
      "slideNumber": 4,
      "layout": "big-stat",
      "icon": "",
      "heading": "",
      "stats": [
        { "number": "", "label": "", "context": "" },
        { "number": "", "label": "", "context": "" },
        { "number": "", "label": "", "context": "" }
      ],
      "speakerNotes": ""
    },
    {
      "slideNumber": 5,
      "layout": "quote",
      "icon": "",
      "quote": "",
      "attribution": "",
      "speakerNotes": ""
    },
    {
      "slideNumber": 6,
      "layout": "timeline",
      "icon": "",
      "heading": "",
      "steps": [
        { "label": "", "description": "" },
        { "label": "", "description": "" },
        { "label": "", "description": "" },
        { "label": "", "description": "" },
        { "label": "", "description": "" }
      ],
      "speakerNotes": ""
    },
    {
      "slideNumber": 7,
      "layout": "grid",
      "icon": "",
      "heading": "",
      "cards": [
        { "icon": "", "title": "", "description": "" },
        { "icon": "", "title": "", "description": "" },
        { "icon": "", "title": "", "description": "" },
        { "icon": "", "title": "", "description": "" }
      ],
      "speakerNotes": ""
    },
    {
      "slideNumber": 8,
      "layout": "closing",
      "icon": "",
      "heading": "",
      "callToAction": "",
      "contactInfo": "",
      "speakerNotes": ""
    }
  ]
}

Presentation topic: ${topic}
Style preference: ${style}
Number of slides: ${slideCount}
`

  try {
    const { reply, error } = await generateAIResponse(
      [{ role: 'user', content: prompt }],
      '',
      3000
    )

    if (error || !reply) {
      return NextResponse.json(
        { error: error || 'ToolAI busy' },
        { status: 503 }
      )
    }

    // Parse JSON with fallback extraction
    let ppt
    try {
      const clean = reply.replace(/```json|```/g, '').trim()
      ppt = JSON.parse(clean)
    } catch {
      const match = reply.match(/\{[\s\S]*\}/)
      if (!match) {
        return NextResponse.json(
          { error: 'Model returned invalid JSON. Please try again.' },
          { status: 500 }
        )
      }
      try {
        ppt = JSON.parse(match[0])
      } catch {
        return NextResponse.json(
          { error: 'Could not parse response. Please try again.' },
          { status: 500 }
        )
      }
    }

    if (!ppt?.slides?.length) {
      return NextResponse.json(
        { error: 'Incomplete data received. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ppt })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('PPT generation failed:', message)
    return NextResponse.json(
      { error: 'ToolAI busy' },
      { status: 503 }
    )
  }
}
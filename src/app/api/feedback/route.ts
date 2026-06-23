import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from 'fs'
import path from 'path'

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json')

// Ensure feedback file exists
async function ensureFeedbackFile() {
  try {
    await fs.access(FEEDBACK_FILE)
  } catch {
    await fs.mkdir(path.dirname(FEEDBACK_FILE), { recursive: true })
    await fs.writeFile(FEEDBACK_FILE, '[]')
  }
}

// Read feedback from file
async function readFeedback() {
  await ensureFeedbackFile()
  const data = await fs.readFile(FEEDBACK_FILE, 'utf-8')
  return JSON.parse(data)
}

// Write feedback to file
async function writeFeedback(feedback: any[]) {
  await ensureFeedbackFile()
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedback, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, type, subject, message, toolName } = body

    // Validate required fields
    if (!type || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: type, subject, and message are required" },
        { status: 400 }
      )
    }

    // Validate feedback type
    if (!["problem", "suggestion", "promotion"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid feedback type. Must be: problem, suggestion, or promotion" },
        { status: 400 }
      )
    }

    // Create feedback entry
    const feedbackEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name || "Anonymous",
      email: email || "Not provided",
      type,
      subject,
      message,
      toolName: toolName || "N/A",
      status: "new"
    }

    // Save to file
    const feedbacks = await readFeedback()
    feedbacks.unshift(feedbackEntry) // Add to beginning
    await writeFeedback(feedbacks)

    console.log("Feedback saved:", feedbackEntry)

    return NextResponse.json(
      { 
        success: true, 
        message: "Feedback submitted successfully. Thank you for your input!" 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Feedback submission error:", error)
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const feedbacks = await readFeedback()
    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error("Error reading feedback:", error)
    return NextResponse.json(
      { error: "Failed to load feedback" },
      { status: 500 }
    )
  }
}

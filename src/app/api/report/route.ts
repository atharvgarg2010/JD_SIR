import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse request body
    const body = await request.json()
    const { assessment_id, custom_rules } = body

    if (!assessment_id) {
      return NextResponse.json({ error: 'Missing assessment_id' }, { status: 400 })
    }

    // 3. Fetch Assessment Data
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessment_id)
      .single()

    if (assessmentError || !assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 })
    }

    // 4. Check if report already exists to prevent duplicate generation
    const { data: existingReport } = await supabase
      .from('reports')
      .select('id')
      .eq('assessment_id', assessment_id)
      .single()

    if (existingReport) {
      return NextResponse.json({ error: 'Report already exists for this assessment' }, { status: 409 })
    }

    // 5. Construct Prompt for Gemini
    const { dimension_scores, raw_answers } = assessment
    
    // Extract demographic variables
    const userName = raw_answers['q1'] || 'the user';
    const userDOB = raw_answers['q2'] || 'Unknown';
    
    const prompt = `
      You are an expert psychometrician, astrologer, and strategic advisor (JD SIR).
      You are analyzing a user named ${userName}, born on ${userDOB}, based on their assessment telemetry.
      
      Scores: ${JSON.stringify(dimension_scores)}
      Answers: ${JSON.stringify(raw_answers)}

      Client Rules & Tone (JD SIR's instructions):
      ${custom_rules || 'Provide a highly detailed, professional, and actionable synthesis of their personality traits. Focus on cognitive patterns, decision-making, and growth trajectories.'}
      
      CRITICAL INSTRUCTION:
      You MUST analyze their Date of Birth (${userDOB}) to determine their core Astrological archetype (Sun sign, and likely planetary influences). 
      You MUST synthesize this astrological profile with their psychological scores above. Explain how their astrological nature aligns (or conflicts) with their cognitive choices.
      Address the user by their name (${userName}) occasionally to make the report deeply personal.

      Generate a comprehensive markdown report.
    `

    // 6. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const markdownText = response.text()

    // 7. Save Report to Supabase
    const { data: savedReport, error: insertError } = await supabase
      .from('reports')
      .insert({
        user_id: user.id,
        assessment_id: assessment_id,
        markdown_content: markdownText
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ success: true, report: savedReport })

  } catch (error: any) {
    console.error('Error generating report:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

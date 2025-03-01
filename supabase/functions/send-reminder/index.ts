
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.1'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { claimantId, email, name, link } = await req.json()

    if (!claimantId || !email || !link) {
      return new Response(
        JSON.stringify({ error: 'Required parameters missing' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update the last reminder date
    const { error: updateError } = await supabase
      .from('questionnaire_tracking')
      .update({ last_reminder_date: new Date().toISOString() })
      .eq('id', claimantId)

    if (updateError) {
      console.error('Error updating reminder date:', updateError)
      throw updateError
    }

    // You would typically use a service like Resend here
    // For this example, we'll simulate a successful email send
    console.log(`Sending reminder email to ${name} <${email}> with link: ${link}`)
    
    // If you have Resend API key set up:
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'Reminder: Please Complete Your Questionnaire',
          html: `
            <div>
              <p>Dear ${name},</p>
              <p>This is a friendly reminder to complete your medical assessment questionnaire that was previously sent to you.</p>
              <p>You can access your personalized questionnaire by clicking on the link below:</p>
              <p><a href="${link}">Complete Your Questionnaire</a></p>
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              <p>Best regards,<br>Medical Assessment Team</p>
            </div>
          `,
        }),
      })
      
      const resendData = await resendResponse.json()
      console.log('Resend API response:', resendData)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

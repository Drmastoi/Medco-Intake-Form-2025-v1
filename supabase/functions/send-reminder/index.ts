
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReminderEmailRequest {
  to: string;
  name: string;
  link: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, name, link }: ReminderEmailRequest = await req.json();

    if (!to || !link) {
      return new Response(
        JSON.stringify({ error: "Email address and link are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Medical Assessment <onboarding@resend.dev>",
      to: [to],
      subject: "Reminder: Please Complete Your Medical Assessment Questionnaire",
      html: `
        <h2>Reminder: Your Medical Assessment Questionnaire</h2>
        <p>Dear ${name},</p>
        <p>This is a friendly reminder to complete your medical assessment questionnaire that was sent to you earlier.</p>
        <p>Your input is important for your injury assessment and treatment planning.</p>
        <p><a href="${link}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 10px;">Complete Questionnaire</a></p>
        <p>If you've already completed the questionnaire, please disregard this reminder.</p>
        <p>Best regards,<br>Your Medical Assessment Team</p>
      `,
    });

    console.log("Reminder email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

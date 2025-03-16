
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  to_email: string;
  to_name: string;
  reference_number: string;
  link: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to_email, to_name, reference_number, link }: InvitationRequest = await req.json();

    console.log("Sending invitation email to:", to_email);

    const emailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [to_email],
      subject: `Medical Assessment Questionnaire - Reference: ${reference_number}`,
      html: `
        <h1>Personal Injury Assessment Questionnaire</h1>
        <p>Dear ${to_name},</p>
        <p>As part of your personal injury assessment process, we have prepared a detailed questionnaire for you to complete.</p>
        <p><strong>Your reference number: ${reference_number}</strong></p>
        <p>Please click on the link below to access your personalized questionnaire:</p>
        <p><a href="${link}" style="padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Access Questionnaire</a></p>
        <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
        <p>${link}</p>
        <p>Once you complete the questionnaire, a medical report will be generated for your review and approval before being submitted to the medical expert.</p>
        <p>If you have any questions or need assistance while completing the questionnaire, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Your Medical Assessment Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-claimant-invitation function:", error);
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

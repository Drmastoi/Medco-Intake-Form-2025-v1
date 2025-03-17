
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendClaimantLinkRequest {
  recipientEmail: string;
  recipientName?: string;
  shareableLink: string;
  senderName: string;
  medcoReference?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      recipientName, 
      shareableLink, 
      senderName,
      medcoReference 
    }: SendClaimantLinkRequest = await req.json();

    console.log("Sending claimant link email to:", recipientEmail);
    console.log("With link:", shareableLink);

    const emailResponse = await resend.emails.send({
      from: "MEDCO Assessment <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: "Your MEDCO Assessment Questionnaire",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a5885;">MEDCO Assessment Questionnaire</h2>
          <p>Dear ${recipientName || "Valued Client"},</p>
          <p>As part of your personal injury assessment process, we have prepared a detailed questionnaire for you to complete.</p>
          ${medcoReference ? `<p>Your MEDCO Reference: <strong>${medcoReference}</strong></p>` : ''}
          <p>Please click on the link below to access your personalized questionnaire. The form will be pre-filled with the information we already have:</p>
          <p style="margin: 20px 0;">
            <a href="${shareableLink}" 
               style="background-color: #2a5885; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Complete Your Questionnaire
            </a>
          </p>
          <p>If you have any questions or need assistance while completing the questionnaire, please don't hesitate to contact us.</p>
          <p>Best regards,<br>${senderName || "Medical Assessment Team"}</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
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
    console.error("Error in send-claimant-link function:", error);
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

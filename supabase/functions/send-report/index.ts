
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendReportRequest {
  to: string;
  pdf_base64: string;
  recipient_email: string;
  recipient_name: string;
  client_name: string;
  date_of_accident: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { 
      pdf_base64,
      recipient_email,
      recipient_name,
      client_name,
      date_of_accident
    }: SendReportRequest = await req.json();

    console.log("Sending report email to:", recipient_email);

    // If recipient_email is not provided, use a default
    const to = recipient_email || "drawais@gmail.com";
    const name = recipient_name || "Doctor";
    
    // Create PDF attachment from base64 string
    const emailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [to],
      subject: `Medical Report for ${client_name || "Patient"}`,
      html: `
        <h1>Medical Report</h1>
        <p>Dear ${name},</p>
        <p>Please find attached the medical report for ${client_name || "Patient"}.</p>
        <p>Date of Accident: ${date_of_accident || "Not specified"}</p>
        <p>This is a full medical report for your review.</p>
        <p>Best regards,<br>Medical Assessment Team</p>
      `,
      attachments: [
        {
          filename: `Medical_Report_${client_name || "Patient"}.pdf`,
          content: pdf_base64,
        },
      ],
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
    console.error("Error in send-report function:", error);
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

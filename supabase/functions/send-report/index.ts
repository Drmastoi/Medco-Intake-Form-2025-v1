
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
  pdfBase64: string;
  patientName: string;
  referenceNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, pdfBase64, patientName, referenceNumber }: SendReportRequest = await req.json();

    console.log("Sending report email to:", to);

    const emailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [to],
      subject: `MEDCO Report - Reference: ${referenceNumber}`,
      html: `
        <h1>MEDCO Medical Report</h1>
        <p>Please find attached the medical report for patient: ${patientName}</p>
        <p>Reference Number: ${referenceNumber}</p>
        <p>Best regards,<br>Medical Assessment Team</p>
      `,
      attachments: [
        {
          filename: `MEDCO_Report_${patientName}_${referenceNumber}.pdf`,
          content: pdfBase64,
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

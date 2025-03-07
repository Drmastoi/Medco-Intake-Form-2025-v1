
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
  isClaimantCopy?: boolean;
  signature?: string;
  signatureDate?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      to, 
      pdfBase64, 
      patientName, 
      referenceNumber, 
      isClaimantCopy,
      signature,
      signatureDate
    }: SendReportRequest = await req.json();

    console.log("Sending report email to:", to);

    // Format the signature date if provided
    const formattedDate = signatureDate ? new Date(signatureDate).toLocaleString('en-GB') : 'Not provided';

    const emailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [to],
      subject: `MEDCO Report - Reference: ${referenceNumber}`,
      html: `
        <h1>MEDCO ${isClaimantCopy ? 'Summary' : 'Medical'} Report</h1>
        <p>Please find attached the ${isClaimantCopy ? 'summary' : 'medical'} report for patient: ${patientName}</p>
        <p>Reference Number: ${referenceNumber}</p>
        ${isClaimantCopy ? `
        <p>A full copy of your medical report has been sent to our medical expert for review.</p>
        <p>Please save your reference number for future correspondence.</p>
        ${signature ? `<p>Confirmed and signed by: ${signature} on ${formattedDate}</p>` : ''}
        ` : `
        <p>This is a full medical report for your review.</p>
        <p>Please assess and provide your expert opinion on the case.</p>
        ${signature ? `<p>Patient signature: ${signature} on ${formattedDate}</p>` : ''}
        `}
        <p>Best regards,<br>Medical Assessment Team</p>
      `,
      attachments: [
        {
          filename: `MEDCO_${isClaimantCopy ? 'Summary' : 'Medical'}_Report_${patientName}_${referenceNumber}.pdf`,
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

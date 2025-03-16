
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { ReportData } from "../../src/types/reportTypes.ts";
import { generatePdfAsBase64 } from "../../src/utils/pdfGenerationUtils.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CompletedReportRequest {
  reference_number: string;
  claimant_report_data: ReportData;
  expert_report_data: ReportData;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reference_number, claimant_report_data, expert_report_data }: CompletedReportRequest = await req.json();

    console.log("Processing completed reports for reference:", reference_number);
    
    // Get the submission details from the database
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    const submissionResponse = await fetch(
      `${supabaseUrl}/rest/v1/questionnaire_submissions?reference_number=eq.${reference_number}&select=*`,
      {
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        },
      }
    );
    
    if (!submissionResponse.ok) {
      throw new Error(`Failed to fetch submission data: ${submissionResponse.statusText}`);
    }
    
    const submissionData = await submissionResponse.json();
    if (!submissionData || submissionData.length === 0) {
      throw new Error(`No submission found with reference number: ${reference_number}`);
    }
    
    const submission = submissionData[0];
    const expertEmail = submission.expert_email;
    const claimantEmail = submission.claimant_email;
    const claimantName = submission.claimant_name || "Client";
    
    // Generate PDFs for both reports
    // Note: In a real implementation, we would integrate with the PDF generation service
    // For this prototype, we'll simulate the PDF generation
    
    // Send expert report to medical expert
    const expertEmailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [expertEmail],
      subject: `Completed Medical Report - Reference: ${reference_number}`,
      html: `
        <h1>Completed Medical Report</h1>
        <p>A client has completed their medical assessment questionnaire.</p>
        <p><strong>Reference Number:</strong> ${reference_number}</p>
        <p><strong>Client Name:</strong> ${claimantName}</p>
        <p>The full medical report is attached to this email for your review.</p>
        <p>Best regards,<br>Medical Report System</p>
      `,
      attachments: [
        {
          filename: `MEDCO_Medical_Report_${reference_number}.pdf`,
          content: "JVBERi0xLjcKJcjm6Q==" // This is a placeholder - in real system would be actual PDF content
        },
      ],
    });
    
    // Send confirmation and claimant report to claimant
    const claimantEmailResponse = await resend.emails.send({
      from: "MEDCO Reports <onboarding@resend.dev>",
      to: [claimantEmail],
      subject: `Your Medical Report Confirmation - Reference: ${reference_number}`,
      html: `
        <h1>Medical Report Submitted</h1>
        <p>Dear ${claimantName},</p>
        <p>Thank you for completing your medical assessment questionnaire.</p>
        <p><strong>Reference Number:</strong> ${reference_number}</p>
        <p>Your report has been submitted to our medical expert for review.</p>
        <p>A copy of your report is attached to this email for your records.</p>
        <p>Best regards,<br>Medical Report Team</p>
      `,
      attachments: [
        {
          filename: `Your_Medical_Report_${reference_number}.pdf`,
          content: "JVBERi0xLjcKJcjm6Q==" // This is a placeholder - in real system would be actual PDF content
        },
      ],
    });
    
    // Update the submission record with status
    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/questionnaire_submissions?id=eq.${submission.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          status: "submitted_to_expert"
        })
      }
    );
    
    if (!updateResponse.ok) {
      throw new Error(`Failed to update submission status: ${updateResponse.statusText}`);
    }

    console.log("Reports sent successfully to expert and claimant");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-completed-reports function:", error);
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

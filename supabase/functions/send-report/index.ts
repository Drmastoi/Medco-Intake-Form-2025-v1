
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendReportRequest {
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

    // Log key information for debugging
    console.log(`Request received to send report to: ${recipient_email}`);
    console.log(`PDF data size: ${pdf_base64.length} characters`);
    console.log(`Using RESEND_API_KEY: ${Deno.env.get("RESEND_API_KEY") ? "Key exists" : "Key is missing or empty"}`);

    // If recipient_email is not provided, use a default
    const to = recipient_email || "drawais@gmail.com";
    const name = recipient_name || "Doctor";
    
    // Create email request
    const emailRequest = {
      from: "Medico Legal Reports <reports@medco-legal.com>",
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
    };

    console.log("Sending email with the following configuration:");
    console.log(`From: ${emailRequest.from}`);
    console.log(`To: ${emailRequest.to.join(", ")}`);
    console.log(`Subject: ${emailRequest.subject}`);
    
    // Try to send the email
    const emailResponse = await resend.emails.send(emailRequest);

    console.log("Email send attempt complete");
    console.log("Response from Resend API:", JSON.stringify(emailResponse, null, 2));

    // Check for error in response
    if (emailResponse.error) {
      console.error("Resend API returned an error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: emailResponse.error, 
          message: "Failed to send email through Resend API" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Email sent successfully",
      data: emailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-report function:", error);
    console.error("Stack trace:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        message: "Exception occurred while sending email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

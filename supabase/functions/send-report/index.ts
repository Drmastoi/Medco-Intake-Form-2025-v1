
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for the expected request body
interface EmailRequest {
  pdf_base64: string;
  recipient_email: string;
  recipient_name: string;
  client_name: string;
  date_of_accident: string;
}

serve(async (req: Request) => {
  console.log("Function triggered");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Check if the request body is empty
    const contentLength = req.headers.get("content-length");
    if (!contentLength || parseInt(contentLength) === 0) {
      console.error("Empty request body");
      return new Response(
        JSON.stringify({ 
          error: "Empty request body", 
          code: "EMPTY_REQUEST_BODY" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Get the Resend API key from environment variables
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    console.log("RESEND_API_KEY present:", !!resendApiKey, "Length:", resendApiKey ? resendApiKey.length : 0);
    
    // Check if the API key is missing
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Missing API key", 
          code: "MISSING_API_KEY",
          message: "RESEND_API_KEY environment variable is not set" 
        }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Initialize Resend client
    const resend = new Resend(resendApiKey);
    
    // Parse request body
    const { 
      pdf_base64, 
      recipient_email, 
      recipient_name, 
      client_name,
      date_of_accident 
    }: EmailRequest = await req.json();
    
    // Validate required fields
    if (!pdf_base64) {
      console.error("Missing PDF data");
      return new Response(
        JSON.stringify({ 
          error: "Missing PDF data", 
          code: "MISSING_PDF" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    if (!recipient_email) {
      console.error("Missing recipient email");
      return new Response(
        JSON.stringify({ 
          error: "Missing recipient email", 
          code: "MISSING_EMAIL" 
        }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }
    
    // Prepare safe recipient name
    const safeName = recipient_name || "Client";
    
    console.log(`Sending email to: ${recipient_email}`);
    
    // Generate filename using client name and date
    const safeClientName = client_name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Client';
    const formattedDate = date_of_accident?.replace(/[^0-9]/g, '') || new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `Medical_Report_${safeClientName}_${formattedDate}.pdf`;
    
    // Send email with PDF attachment
    const emailResponse = await resend.emails.send({
      from: "Medical Reports <onboarding@resend.dev>",
      to: recipient_email,
      subject: "Your Medical Report",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Medical Report</h2>
          <p>Dear ${safeName},</p>
          <p>Please find attached your medical report following your recent assessment.</p>
          <p>This report contains important medical information related to your case.</p>
          <p>If you have any questions about this report, please contact your solicitor.</p>
          <p>Best regards,<br/>Medical Assessment Team</p>
        </div>
      `,
      attachments: [
        {
          content: pdf_base64,
          filename: filename,
        },
      ],
    });
    
    console.log("Email sent successfully:", emailResponse);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        status: "success", 
        data: emailResponse
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    // Determine if the error is from the Resend API
    const isResendError = error.name === "ResendError" || 
                          (error.message && (
                            error.message.includes("API key") || 
                            error.message.includes("domain") ||
                            error.message.includes("Resend")
                          ));
    
    const errorCode = isResendError ? 
      (error.message?.includes("API key") ? "INVALID_API_KEY" : 
       error.message?.includes("domain") ? "DOMAIN_NOT_VERIFIED" : "RESEND_ERROR") 
      : "INTERNAL_ERROR";
      
    console.error(`Error in send-report function (${errorCode}):`, error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred", 
        code: errorCode,
        details: error.details || error.stack || null
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});

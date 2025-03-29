
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight
function handleCorsPreflightRequest(): Response {
  return new Response(null, { headers: corsHeaders });
}

serve(async (req: Request): Promise<Response> => {
  console.log("Email function triggered");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest();
  }
  
  try {
    // Check content type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Invalid content type:", contentType);
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Get API key
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return new Response(
        JSON.stringify({ error: "API key not configured", code: "MISSING_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Parse request body
    let data;
    try {
      data = await req.json();
      console.log("Request data received successfully");
    } catch (error) {
      console.error("Failed to parse request:", error);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validate required fields
    if (!data.pdfBase64) {
      return new Response(
        JSON.stringify({ error: "Missing PDF data" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!data.recipientEmail) {
      return new Response(
        JSON.stringify({ error: "Missing recipient email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Initialize Resend with the API key
    const resend = new Resend(apiKey);
    
    // Create safe values
    const recipientName = data.recipientName || "Recipient";
    const subject = data.subject || "Medical Report";
    const fileName = data.fileName || "medical_report.pdf";
    
    // Send email with attachment
    try {
      console.log(`Sending email to ${data.recipientEmail}`);
      
      const emailResponse = await resend.emails.send({
        from: "Medical Reports <onboarding@resend.dev>",
        to: data.recipientEmail,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2>Medical Report</h2>
            <p>Dear ${recipientName},</p>
            <p>Please find attached your medical report.</p>
            <p>If you have any questions, please contact your healthcare provider.</p>
            <p>Best regards,<br/>Medical Assessment Team</p>
          </div>
        `,
        attachments: [
          {
            content: data.pdfBase64,
            filename: fileName,
          },
        ],
      });
      
      console.log("Email sent successfully:", emailResponse);
      
      return new Response(
        JSON.stringify({ success: true, data: emailResponse }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
      
    } catch (error) {
      console.error("Error sending email:", error);
      
      return new Response(
        JSON.stringify({ 
          error: error.message || "Unknown error",
          code: error.statusCode ? `ERROR_${error.statusCode}` : "EMAIL_SEND_ERROR",
          details: error.details || null
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
  } catch (error) {
    console.error("Unhandled error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});

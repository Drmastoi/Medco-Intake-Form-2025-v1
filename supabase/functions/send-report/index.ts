
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

// Handle CORS preflight requests
function handleCorsPreflightRequest(): Response {
  console.log("Handling OPTIONS request");
  return new Response(null, { headers: corsHeaders });
}

// Validate API key
function validateApiKey(): { isValid: boolean; key: string; error?: { message: string; code: string } } {
  const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
  console.log("RESEND_API_KEY present:", !!resendApiKey, "Length:", resendApiKey ? resendApiKey.length : 0);
  
  if (!resendApiKey) {
    return {
      isValid: false,
      key: "",
      error: {
        message: "RESEND_API_KEY environment variable is not set",
        code: "MISSING_API_KEY"
      }
    };
  }
  
  return { isValid: true, key: resendApiKey };
}

// Validate request data
function validateRequestData(data: Partial<EmailRequest>): { isValid: boolean; error?: { message: string; code: string } } {
  if (!data.pdf_base64) {
    return {
      isValid: false,
      error: {
        message: "Missing PDF data",
        code: "MISSING_PDF"
      }
    };
  }
  
  if (!data.recipient_email) {
    return {
      isValid: false,
      error: {
        message: "Missing recipient email",
        code: "MISSING_EMAIL"
      }
    };
  }
  
  return { isValid: true };
}

// Generate email content
function generateEmailContent(safeName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Medical Report</h2>
      <p>Dear ${safeName},</p>
      <p>Please find attached your medical report following your recent assessment.</p>
      <p>This report contains important medical information related to your case.</p>
      <p>If you have any questions about this report, please contact your solicitor.</p>
      <p>Best regards,<br/>Medical Assessment Team</p>
    </div>
  `;
}

// Create a filename for the PDF
function generatePdfFilename(clientName: string, dateOfAccident: string): string {
  const safeClientName = clientName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Client';
  const formattedDate = dateOfAccident?.replace(/[^0-9]/g, '') || new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `Medical_Report_${safeClientName}_${formattedDate}.pdf`;
}

// Send email with PDF attachment
async function sendEmailWithPdf(
  resend: Resend,
  recipient: string,
  safeName: string,
  pdfBase64: string,
  filename: string
): Promise<{ success: boolean; data?: any; error?: { message: string; code: string; details?: any } }> {
  try {
    console.log(`Sending email to: ${recipient}`);
    
    const emailResponse = await resend.emails.send({
      from: "Medical Reports <onboarding@resend.dev>",
      to: recipient,
      subject: "Your Medical Report",
      html: generateEmailContent(safeName),
      attachments: [
        {
          content: pdfBase64,
          filename: filename,
        },
      ],
    });
    
    console.log("Email sent successfully:", emailResponse);
    return { success: true, data: emailResponse };
  } catch (error) {
    // Determine error type
    const isResendError = error.name === "ResendError" || 
                          (error.message && (
                            error.message.includes("API key") || 
                            error.message.includes("domain") ||
                            error.message.includes("Resend")
                          ));
    
    const errorCode = isResendError ? 
      (error.message?.includes("API key") ? "INVALID_API_KEY" : 
      error.message?.includes("domain") ? "DOMAIN_NOT_VERIFIED" : "RESEND_ERROR") 
      : "EMAIL_SEND_ERROR";
      
    console.error(`Error sending email (${errorCode}):`, error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    return { 
      success: false, 
      error: {
        message: error.message || "Unknown error occurred",
        code: errorCode,
        details: error.details || error.stack || null
      }
    };
  }
}

// Create error response
function createErrorResponse(error: { message: string; code: string, details?: any }): Response {
  return new Response(
    JSON.stringify({ 
      error: error.message, 
      code: error.code,
      details: error.details || null
    }),
    { 
      status: 500, 
      headers: { "Content-Type": "application/json", ...corsHeaders } 
    }
  );
}

// Create success response
function createSuccessResponse(data: any): Response {
  return new Response(
    JSON.stringify({ 
      status: "success", 
      data: data
    }),
    { 
      status: 200, 
      headers: { "Content-Type": "application/json", ...corsHeaders } 
    }
  );
}

// Main handler function
async function handleRequest(req: Request): Promise<Response> {
  console.log("Function triggered");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest();
  }
  
  try {
    // Check if the request has a body and proper content-type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Invalid content type:", contentType);
      return createErrorResponse({ 
        message: "Content-Type must be application/json", 
        code: "INVALID_CONTENT_TYPE" 
      });
    }
    
    // Ensure request body is not empty
    const bodyText = await req.text();
    if (!bodyText || bodyText.trim() === '') {
      console.error("Empty request body");
      return createErrorResponse({ 
        message: "Empty request body", 
        code: "EMPTY_REQUEST_BODY" 
      });
    }
    
    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(bodyText);
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return createErrorResponse({ 
        message: "Failed to parse request body: " + (parseError.message || "Invalid JSON"), 
        code: "INVALID_JSON" 
      });
    }
    
    // Validate API key
    const apiKeyResult = validateApiKey();
    if (!apiKeyResult.isValid) {
      return createErrorResponse(apiKeyResult.error!);
    }
    
    // Initialize Resend client
    const resend = new Resend(apiKeyResult.key);
    
    // Validate required fields
    const validationResult = validateRequestData(requestData);
    if (!validationResult.isValid) {
      return createErrorResponse(validationResult.error!);
    }
    
    const { 
      pdf_base64, 
      recipient_email, 
      recipient_name, 
      client_name,
      date_of_accident 
    } = requestData as EmailRequest;
    
    // Prepare safe recipient name
    const safeName = recipient_name || "Client";
    
    // Generate filename for PDF
    const filename = generatePdfFilename(client_name, date_of_accident);
    
    // Send email with PDF attachment
    const emailResult = await sendEmailWithPdf(
      resend,
      recipient_email,
      safeName,
      pdf_base64,
      filename
    );
    
    if (!emailResult.success) {
      return createErrorResponse(emailResult.error!);
    }
    
    // Return success response
    return createSuccessResponse(emailResult.data);
    
  } catch (error) {
    console.error("Unhandled error in send-report function:", error);
    
    return createErrorResponse({
      message: error.message || "Unknown error occurred",
      code: "INTERNAL_ERROR",
      details: error.stack || null
    });
  }
}

serve(handleRequest);

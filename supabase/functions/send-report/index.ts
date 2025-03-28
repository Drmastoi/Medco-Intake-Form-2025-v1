
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Create Resend instance with API key validation
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_BqF25hQp_HQqRXzPWidSjhHvsGbjZHq39";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

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
  console.log("Edge function triggered with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    // Check if the request has content
    const contentLength = req.headers.get("content-length");
    if (!contentLength || parseInt(contentLength) === 0) {
      console.error("Empty request body");
      return new Response(
        JSON.stringify({ 
          error: "Empty request body", 
          code: "EMPTY_REQUEST" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate API key is present
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing");
      return new Response(
        JSON.stringify({ 
          error: "Configuration error", 
          message: "Resend API key is not configured", 
          code: "MISSING_API_KEY" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse request body with error handling
    let requestBody;
    let requestText = "";
    try {
      // Clone the request and read as text first for debugging
      const clonedReq = req.clone();
      requestText = await clonedReq.text();
      console.log("Raw request body:", requestText);
      
      // Parse if we have content
      if (requestText.trim()) {
        requestBody = JSON.parse(requestText);
        console.log("Request body parsed successfully");
      } else {
        throw new Error("Empty request body");
      }
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      console.error("Request text received:", requestText);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          details: parseError.message,
          receivedData: requestText.substring(0, 100) + (requestText.length > 100 ? "..." : ""),
          code: "INVALID_JSON"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { 
      pdf_base64,
      recipient_email,
      recipient_name,
      client_name,
      date_of_accident
    }: SendReportRequest = requestBody || {};

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
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    if (recipient_email && !recipient_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.error("Invalid email format:", recipient_email);
      return new Response(
        JSON.stringify({ 
          error: "Invalid email format", 
          code: "INVALID_EMAIL" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check PDF size to avoid limits
    const pdfSize = pdf_base64 ? pdf_base64.length : 0;
    console.log(`PDF data size: ${pdfSize} characters`);
    
    if (pdfSize > 5000000) { // About 5MB after base64 encoding
      console.error("PDF data too large, exceeds 5MB when encoded");
      return new Response(
        JSON.stringify({ 
          error: "PDF data too large, please reduce file size", 
          code: "PDF_TOO_LARGE" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate Resend instance
    if (!resend) {
      console.error("Resend instance creation failed");
      return new Response(
        JSON.stringify({ 
          error: "Email service initialization failed", 
          code: "SERVICE_INIT_FAILED" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // If recipient_email is not provided, use a default
    const to = recipient_email || "drawais@gmail.com";
    const name = recipient_name || "Doctor";
    
    // Using the default Resend domain
    const from = "Medico Legal Reports <onboarding@resend.dev>";
    
    // Create email request
    const emailRequest = {
      from: from,
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
    console.log(`Attachment size: ${pdf_base64.length} bytes`);
    
    // Try to send the email with more detailed error handling
    console.log("Calling Resend API...");
    try {
      const emailResponse = await resend.emails.send(emailRequest);
      console.log("Raw Resend API response:", JSON.stringify(emailResponse));
      
      // Check for error in response
      if (emailResponse.error) {
        console.error("Resend API returned an error:", emailResponse.error);
        
        // Check for specific error types
        let errorCode = "RESEND_API_ERROR";
        let errorMessage = "Failed to send email through Resend API";
        
        // Determine detailed error code based on message patterns
        const errorString = JSON.stringify(emailResponse.error);
        if (errorString.includes("API key")) {
          errorCode = "INVALID_API_KEY";
          errorMessage = "Invalid Resend API key";
        } else if (errorString.includes("domain") || errorString.includes("verify")) {
          errorCode = "DOMAIN_NOT_VERIFIED";
          errorMessage = "Sending domain not verified";
        } else if (errorString.includes("rate limit")) {
          errorCode = "RATE_LIMIT_EXCEEDED";
          errorMessage = "Rate limit exceeded";
        }
        
        return new Response(
          JSON.stringify({ 
            error: emailResponse.error,
            message: errorMessage,
            code: errorCode,
            request: {
              to: emailRequest.to,
              from: emailRequest.from,
              subject: emailRequest.subject,
              attachmentSizeBytes: pdfSize
            }
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      console.log("Email sent successfully!");
      return new Response(JSON.stringify({
        success: true,
        message: "Email sent successfully",
        data: emailResponse,
        requestDetails: {
          to: emailRequest.to,
          from: emailRequest.from,
          subject: emailRequest.subject
        }
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (resendError: any) {
      // Detailed logging of the Resend API error
      console.error("Exception from Resend API:", resendError);
      console.error("Error details:", JSON.stringify({
        name: resendError.name,
        message: resendError.message,
        stack: resendError.stack,
        // Extract any response data if available
        response: resendError.response ? {
          status: resendError.response.status,
          data: resendError.response.data
        } : 'No response data'
      }));
      
      // Check for specific error types
      let errorCode = "RESEND_API_ERROR";
      let errorMessage = "Failed to send email";
      
      const errorString = resendError.message || "";
      if (errorString.includes("API key")) {
        errorCode = "INVALID_API_KEY";
        errorMessage = "Invalid Resend API key";
      } else if (errorString.includes("domain") || errorString.includes("verify")) {
        errorCode = "DOMAIN_NOT_VERIFIED";
        errorMessage = "Sending domain not verified";
      } else if (errorString.includes("rate limit")) {
        errorCode = "RATE_LIMIT_EXCEEDED";
        errorMessage = "Rate limit exceeded";
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorCode, 
          message: errorMessage,
          details: resendError.message,
          stack: resendError.stack,
          // Include additional context for debugging
          context: {
            apiKeyPresent: !!resendApiKey,
            apiKeyLength: resendApiKey ? resendApiKey.length : 0,
            requestDetails: {
              to: emailRequest.to,
              from: emailRequest.from,
              subject: emailRequest.subject,
              attachmentSizeBytes: pdfSize
            }
          }
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error: any) {
    console.error("Unhandled error in send-report function:", error);
    console.error("Stack trace:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: "UNHANDLED_ERROR",
        message: "Exception occurred while sending email",
        details: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

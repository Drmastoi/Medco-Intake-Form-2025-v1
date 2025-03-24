
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
    // Validate API key is present
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return new Response(
        JSON.stringify({ 
          error: "Configuration error", 
          details: "Resend API key is not configured" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          details: parseError.message 
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
    }: SendReportRequest = requestBody;

    // Validate required fields
    if (!pdf_base64) {
      console.error("Missing PDF data");
      return new Response(
        JSON.stringify({ error: "Missing PDF data" }),
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
        JSON.stringify({ error: "Invalid email format" }),
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
        JSON.stringify({ error: "PDF data too large, please reduce file size" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

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
    console.log(`Attachment size: ${pdf_base64.length} bytes`);
    
    // Try to send the email with more detailed error handling
    console.log("Calling Resend API...");
    try {
      const emailResponse = await resend.emails.send(emailRequest);
      console.log("Raw Resend API response:", JSON.stringify(emailResponse));
      
      // Check for error in response
      if (emailResponse.error) {
        console.error("Resend API returned an error:", emailResponse.error);
        return new Response(
          JSON.stringify({ 
            error: emailResponse.error, 
            message: "Failed to send email through Resend API",
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
      
      return new Response(
        JSON.stringify({ 
          error: "Resend API error", 
          details: resendError.message,
          stack: resendError.stack,
          // Include additional context for debugging
          context: {
            apiKeyPresent: !!apiKey,
            apiKeyLength: apiKey ? apiKey.length : 0,
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


import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface EmailErrorDisplayProps {
  errorMessage: string;
  errorCode: string | null;
}

export const EmailErrorDisplay = ({ errorMessage, errorCode }: EmailErrorDisplayProps) => {
  // Helper function to render error guidance
  const renderErrorGuidance = () => {
    if (errorCode === "DOMAIN_NOT_VERIFIED" || 
        errorMessage?.includes('domain') || 
        (typeof errorMessage === 'string' && errorMessage.includes('domain'))) {
      return (
        <div className="mt-2 text-xs">
          <p>Email was sent using the default Resend address:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Sent from: onboarding@resend.dev</li>
          </ul>
        </div>
      );
    }
    
    if (errorCode === "INVALID_API_KEY" || 
        errorMessage?.includes('API key') || 
        (typeof errorMessage === 'string' && errorMessage.includes('API key'))) {
      return (
        <div className="mt-2 text-xs">
          <p>This appears to be a Resend API key issue. Please check:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Your Resend API key is correctly set in Supabase secrets</li>
            <li>The API key is valid and has not expired</li>
          </ul>
        </div>
      );
    }
    
    if (errorCode === "PDF_TOO_LARGE" || 
        (typeof errorMessage === 'string' && errorMessage.includes('too large'))) {
      return (
        <div className="mt-2 text-xs">
          <p>The PDF file is too large to send via email. Please try:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Reducing the amount of content in the report</li>
            <li>Removing any large images</li>
            <li>Making the report less detailed</li>
          </ul>
        </div>
      );
    }
    
    if ((typeof errorMessage === 'string' && errorMessage.includes('Edge Function')) || 
        errorCode === "EDGE_FUNCTION_ERROR") {
      return (
        <div className="mt-2 text-xs">
          <p>There was an error calling the Supabase Edge Function. This might be due to:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Missing RESEND_API_KEY in Supabase project settings</li>
            <li>Network connectivity issues</li>
            <li>Supabase service disruption</li>
          </ul>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Alert variant="destructive" className="my-2">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error Sending Email</AlertTitle>
      <AlertDescription>
        {errorMessage}
        {renderErrorGuidance()}
      </AlertDescription>
    </Alert>
  );
};


// Update just the line where we get the RESEND_API_KEY to include a fallback
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
console.log("RESEND_API_KEY present:", !!resendApiKey, "Length:", resendApiKey ? resendApiKey.length : 0);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

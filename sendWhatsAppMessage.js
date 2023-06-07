// sendWhatsAppMessage.js

import twilio from "twilio";

export async function sendWhatsAppMessage(to, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    //   const from = "whatsapp:+14155238886"; // Replace with your Twilio WhatsApp Sandbox phone number
    const response = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${to}`,
    });

    console.log("Message sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.message);
  }
}

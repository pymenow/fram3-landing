import emailjs from "@emailjs/browser"

// Initialize EmailJS with public key
export const initEmailJS = () => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3vqq_ylZwfdeCwvJK")
}

// Function to send contact form emails
export const sendContactEmail = async (formData: any) => {
  try {
    // Check if a specific template ID is provided
    const templateId = formData.template_id || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_vwnut77"

    // Remove template_id from the data if it exists
    const { template_id, ...emailData } = formData

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmc8zgh",
      templateId,
      emailData,
    )
    return { success: true, response }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}

// Function to send newsletter subscription emails
export const sendSubscriptionEmail = async (formData: any) => {
  try {
    // Make sure we have the correct field name for the recipient
    const emailData = {
      to_email: formData.email,
      email: formData.email,
      recipient: formData.email,
      // Include all possible field names that EmailJS might be expecting
    }

    console.log("Sending subscription with data:", emailData)

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmc8zgh",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2 || "template_vwnut77",
      emailData,
    )
    return { success: true, response }
  } catch (error) {
    console.error("Subscription email sending failed:", error)
    return { success: false, error }
  }
}


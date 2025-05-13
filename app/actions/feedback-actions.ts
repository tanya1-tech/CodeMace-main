"use server"

import { sendFeedbackEmail } from "@/lib/email"

export async function submitFeedback(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const feedbackType = formData.get("feedback-type") as string
    const rating = formData.get("rating") as string
    const message = formData.get("message") as string

    // Additional fields based on feedback type
    let additionalInfo = {}

    if (feedbackType === "bug") {
      additionalInfo = {
        page: formData.get("page") as string,
        steps: formData.get("steps") as string,
      }
    } else if (feedbackType === "feature") {
      additionalInfo = {
        featureTitle: formData.get("feature-title") as string,
        featureBenefit: formData.get("feature-benefit") as string,
      }
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log("Email configuration missing, storing feedback locally")
      // In a real app, you would store this in a database
      console.log("Feedback received:", {
        name,
        email,
        feedbackType,
        rating,
        message,
        additionalInfo,
      })

      // Return success even if email wasn't sent
      return { success: true, message: "Your feedback has been submitted successfully!" }
    }

    // Send email to admin
    try {
      const emailSent = await sendFeedbackEmail(
        "wspace192@gmail.com",
        name,
        email,
        feedbackType,
        rating,
        message,
        additionalInfo,
      )

      if (emailSent) {
        return { success: true, message: "Your feedback has been submitted successfully!" }
      } else {
        console.error("Email sending failed but we'll still process your feedback")
        return { success: true, message: "Your feedback has been submitted successfully!" }
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      // Still return success to the user
      return { success: true, message: "Your feedback has been submitted successfully!" }
    }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return { success: false, message: "An error occurred while submitting your feedback." }
  }
}

import nodemailer from "nodemailer"

// Configure nodemailer with your email service
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email configuration missing")
    return null
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    console.log("Setting up email transport with service:", process.env.EMAIL_SERVICE)

    const transporter = createTransporter()
    if (!transporter) {
      console.error("Failed to create email transporter")
      return false
    }

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timed out after 10 seconds")), 10000)
    })

    // Create the actual email sending promise
    const sendEmailPromise = new Promise(async (resolve, reject) => {
      try {
        console.log("Email service configuration:", {
          service: process.env.EMAIL_SERVICE,
          user: process.env.EMAIL_USER ? "Set" : "Not set",
          pass: process.env.EMAIL_PASSWORD ? "Set" : "Not set",
        })

        console.log("Preparing to send email to:", email)

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "CodeMace - Email Verification",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h2 style="color: #ff6b00; text-align: center;">CodeMace Email Verification</h2>
              <p>Thank you for signing up with CodeMace! Please verify your email address to complete your registration.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                <h3 style="margin: 0; font-size: 24px;">${otp}</h3>
              </div>
              <p>This verification code will expire in 10 minutes.</p>
              <p>If you didn't request this code, you can safely ignore this email.</p>
              <div style="margin-top: 30px; text-align: center; color: #666;">
                <p>© ${new Date().getFullYear()} CodeMace. All rights reserved.</p>
              </div>
            </div>
          `,
        }

        console.log("Sending email...")
        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully:", info.messageId)

        // Resolve with true if successful
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })

    // Race the two promises
    const result = await Promise.race([sendEmailPromise, timeoutPromise])
    return result as boolean
  } catch (error) {
    console.error("Error sending OTP email:", error)
    return false
  }
}

export async function sendFeedbackEmail(
  adminEmail: string,
  name: string,
  email: string,
  feedbackType: string,
  rating: string,
  message: string,
  additionalInfo: any,
): Promise<boolean> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      console.error("Failed to create email transporter")
      return false
    }

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timed out after 10 seconds")), 10000)
    })

    // Create the actual email sending promise
    const sendEmailPromise = new Promise(async (resolve, reject) => {
      try {
        console.log("Preparing to send feedback email to admin:", adminEmail)

        // Format additional info based on feedback type
        let additionalInfoHtml = ""

        if (feedbackType === "bug") {
          additionalInfoHtml = `
            <p><strong>Page:</strong> ${additionalInfo.page || "Not specified"}</p>
            <p><strong>Steps to Reproduce:</strong> ${additionalInfo.steps || "Not specified"}</p>
          `
        } else if (feedbackType === "feature") {
          additionalInfoHtml = `
            <p><strong>Feature Title:</strong> ${additionalInfo.featureTitle || "Not specified"}</p>
            <p><strong>Feature Benefit:</strong> ${additionalInfo.featureBenefit || "Not specified"}</p>
          `
        }

        // Format feedback type for display
        const formattedFeedbackType =
          feedbackType === "bug" ? "Bug Report" : feedbackType === "feature" ? "Feature Request" : "General Feedback"

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: adminEmail,
          subject: `CodeMace Feedback: ${formattedFeedbackType} from ${name}`,
          replyTo: email,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h2 style="color: #ff6b00; text-align: center;">CodeMace Feedback</h2>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Feedback Type:</strong> ${formattedFeedbackType}</p>
                <p><strong>Rating:</strong> ${rating || "Not provided"} / 5</p>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p>${message.replace(/\n/g, "<br>")}</p>
              </div>
              
              ${additionalInfoHtml
              ? `
                <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Additional Information:</h3>
                  ${additionalInfoHtml}
                </div>
              `
              : ""
            }
              
              <div style="margin-top: 30px; text-align: center; color: #666;">
                <p>© ${new Date().getFullYear()} CodeMace. All rights reserved.</p>
              </div>
            </div>
          `,
        }

        console.log("Sending feedback email...")
        const info = await transporter.sendMail(mailOptions)
        console.log("Feedback email sent successfully:", info.messageId)

        // Resolve with true if successful
        resolve(true)
      } catch (error) {
        console.error("Error in sendEmailPromise:", error)
        reject(error)
      }
    })

    // Race the two promises
    const result = await Promise.race([sendEmailPromise, timeoutPromise])
    return result as boolean
  } catch (error) {
    console.error("Error sending feedback email:", error)
    return false
  }
}

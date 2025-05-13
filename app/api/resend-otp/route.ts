import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import OTP from "@/models/otp"
import { sendOTPEmail } from "@/lib/email"

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find existing OTP record
    const existingOTP = await OTP.findOne({ email })

    if (!existingOTP) {
      return NextResponse.json({ error: "No registration in progress for this email" }, { status: 404 })
    }

    // Generate new OTP
    const otp = generateOTP()

    // Update OTP
    existingOTP.otp = otp
    existingOTP.createdAt = new Date()
    await existingOTP.save()

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp)

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Verification code resent to your email",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Resend OTP error:", error)
    return NextResponse.json({ error: "An error occurred while resending OTP" }, { status: 500 })
  }
}

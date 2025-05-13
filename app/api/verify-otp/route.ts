import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import User from "@/models/user"
import OTP from "@/models/otp"

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find the OTP record
    const otpRecord = await OTP.findOne({ email, otp })

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Create the user
    const userData = otpRecord.userData
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    })

    // Delete the OTP record
    await OTP.deleteOne({ _id: otpRecord._id })

    return NextResponse.json(
      {
        message: "Email verified successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "An error occurred during verification" }, { status: 500 })
  }
}

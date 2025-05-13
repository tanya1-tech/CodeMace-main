import mongoose from "mongoose"

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // OTP expires after 10 minutes (600 seconds)
    },
  },
  { timestamps: true },
)

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema)

export default OTP

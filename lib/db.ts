import mongoose from "mongoose"

let isConnected = false

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection")
    return
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables")
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })

    isConnected = db.connections[0].readyState === 1
    console.log("Connected to MongoDB successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw new Error("Failed to connect to MongoDB. Please check your connection string and try again.")
  }
}

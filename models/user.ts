import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    platforms: [
      {
        platformId: String,
        username: String,
        connected: Boolean,
        lastSync: Date,
        autoSync: Boolean,
        private: Boolean,
      },
    ],
    sheets: [
      {
        sheetId: String,
        progress: Number,
        lastUpdated: Date,
        streak: Number,
      },
    ],
    problems: [
      {
        problemId: String,
        platform: String,
        title: String,
        difficulty: String,
        tags: [String],
        solvedDate: Date,
        timeToSolve: Number,
        notes: String,
      },
    ],
    contests: [
      {
        contestId: String,
        platform: String,
        title: String,
        date: Date,
        registered: Boolean,
        rank: Number,
        rating: Number,
        problemsSolved: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User

import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);


tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const tokenBlacklistModel = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema
);

export default tokenBlacklistModel;

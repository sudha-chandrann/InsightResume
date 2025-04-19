import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  verifyCode?: string;
  isVerfied: boolean;
  verifyCodeExpires?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateRefreshToken(): string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should be at least 8 characters"],
    },
    verifyCode: {
      type: String,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    verifyCodeExpires: {
      type: Date,
    },
    passwordResetCode: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  this: IUser,
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

userSchema.methods.generateRefreshToken = function (this: IUser): string {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }

  const rawExpiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
  const expiresIn = rawExpiry as SignOptions["expiresIn"]; 

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign({ _id: this._id }, secret, options);
};

export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

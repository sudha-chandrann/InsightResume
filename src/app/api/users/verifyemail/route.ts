import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface VerifyMailRequestBody {
  email: string;
  code: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json() as VerifyMailRequestBody;
    const { email, code } = body;
    
    const trimmedEmail = email?.trim();
    
    if (!trimmedEmail || !code) {
      return NextResponse.json(
        { success: false, data: null, message: "Email and verification code are required" },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }
    
    const existingUser = await User.findOne({ email: trimmedEmail });
    
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "User with this email is not found",
        },
        { status: 400 }
      );
    }
    
    if (existingUser.isVerfied) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "User is already verified",
      }, { status: 400 });
    }
    
    if (!existingUser.verifyCode ||!existingUser.verifyCodeExpires|| new Date() > existingUser.verifyCodeExpires) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Verification code is invalid or expired",
      }, { status: 400 });
    }
    
    if (existingUser.verifyCode !== code) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Verification code is invalid",
      }, { status: 400 });
    }
    
    existingUser.isVerfied = true;
    existingUser.verifyCode = undefined;
    existingUser.verifyCodeExpires = undefined;
    await existingUser.save();
    
    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "Email verified successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("verifyemail error:", err);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: err.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
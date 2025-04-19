import dbConnect from "@/lib/dbConnect";
import { sendVerifyEmail } from "@/lib/sendVerifyEmail";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface SendVerficationRequestBody {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json() as SendVerficationRequestBody;
    const { email } = body;
    
    const trimmedEmail = email?.trim();
    
    if (
     !trimmedEmail
    ) {
      return NextResponse.json(
        { success: false, data: null, message: "Email is  required" },
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
      if(existingUser.isVerfied){
        return NextResponse.json({
            success: false,
            data: null,
            message: "User is already verified",
        })
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 2 * 60 * 1000); 
      existingUser.verifyCode = code;
      existingUser.verifyCodeExpires = expiry;
      await existingUser.save();
  
      await sendVerifyEmail({to:email, code});

    
    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "Verification code sent successfully",
      },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("SendVerfication error:", error);
    return NextResponse.json(
      {
        success: false,
        data: error,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
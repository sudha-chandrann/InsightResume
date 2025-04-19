import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequestBody {
  email: string;
  password: string;
  fullName: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json() as RegisterRequestBody;
    const { email, password, fullName } = body;
    
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    const trimmedfullName = fullName?.trim();
    
    if (
      [trimmedEmail, trimmedPassword, trimmedfullName].some(
        (field) => !field
      )
    ) {
      return NextResponse.json(
        { success: false, data: null, message: "All fields are required" },
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
    
    if (trimmedPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }
    
    // Check for existing users
    const existingUser = await User.findOne({ email: trimmedEmail });
    
    if (existingUser) {
      if (existingUser.isVerfied) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: "User with this email already exists",
          },
          { status: 400 }
        );
      }
      await User.deleteOne({ _id: existingUser._id });
    }
    
    // Create user
    const user = await User.create({
      email: trimmedEmail,
      password: trimmedPassword,
      fullName: trimmedfullName,
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, data: null, message: "Failed to create new user" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "User account created successfully",
      },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Registration error:", error);
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
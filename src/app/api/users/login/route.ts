import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(req:NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await req.json() as LoginRequestBody;
    
    // Validate required fields
    if (!email ) {
      return NextResponse.json({
        success: false,
        message: "email is required",
        data: null
      }, { status: 400 });
    }
    
    if (!password) {
      return NextResponse.json({
        success: false,
        message: "Password is required",
        data: null
      }, { status: 400 });
    }
    
    // Find existing user
    const existingUser = await User.findOne(
        { email: email?.trim() });
    
    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email or username does not exist",
        data: null
      }, { status: 404 });
    }
    if(!existingUser.isVerfied){
        return NextResponse.json({
            success: false,
            message: "User is not verified",
            data: null
        })
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
        data: null
      }, { status: 401 });
    }
    
    // Generate tokens
    const refreshToken = existingUser.generateRefreshToken();    
    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        userId: existingUser._id,
      }
    }, { status: 200 });
    
    // Set refresh token in HTTP-only cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:  24 * 60 * 60 // 1 days
    });
    
    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message:error.message || "Internal server error",
      data: error
    }, { status: 500 });
  }
}
import nodemailer from 'nodemailer';

export async function sendVerifyEmail({to, code}:{to:string,code:string}) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const currentYear = new Date().getFullYear();

  await transporter.sendMail({
    from: `" InsightResume Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Account Verification Code",
    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://yourdomain.com/logo.png" alt="InsightResume Logo" style="max-width: 150px; height: auto;" />
          </div>
          
          <h2 style="color: #1a1a1a; text-align: center; margin-top: 10px;">🔐 Verify Your Account</h2>
          
          
          <p style="font-size: 16px; color: #444; line-height: 1.6;">
            Thank you for creating an account with InsightResume. To ensure the security of your account, 
            please use the verification code below to complete your registration:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 24px; font-weight: 600; letter-spacing: 2px; color: #2c3e50; background-color: #f0f4f8; padding: 12px 20px; border-radius: 6px; display: inline-block; border: 1px dashed #a3b8cc;">
              ${code}
            </span>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            This code will expire in <strong> 2  minutes</strong>. If you did not request this verification, 
            please ignore this email or contact our support team immediately at 
            <a href="mailto:support@insightresume.com" style="color: #3498db;">support@insightresume.com</a>.
          </p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="font-size: 14px; color: #555; margin: 0;">
              <strong>Important:</strong> Never share this verification code with anyone, including our staff. 
              InsightResume will never ask you for this code via email, phone call, or any other communication method.
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;">
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            Need help? Contact our <a href="mailto:support@insightresume.com" style="color: #3498db;">support team</a>.
          </p>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://twitter.com/insightresume" style="text-decoration: none; margin: 0 10px;">
              <img src="https://yourdomain.com/twitter-icon.png" alt="Twitter" style="width: 24px; height: 24px;">
            </a>
            <a href="https://linkedin.com/company/insightresume" style="text-decoration: none; margin: 0 10px;">
              <img src="https://yourdomain.com/linkedin-icon.png" alt="LinkedIn" style="width: 24px; height: 24px;">
            </a>
          </div>
          
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
            &copy; ${currentYear} InsightResume. All rights reserved.
            <br>
            123 Business Ave, Suite 100, San Francisco, CA 94107
          </p>
        </div>
    `,
  });
  
}
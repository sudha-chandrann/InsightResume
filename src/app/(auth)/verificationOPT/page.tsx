'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { RiShieldCheckLine, RiArrowLeftLine, RiMailSendLine, RiMailLine } from "react-icons/ri";
import { useToast } from '@/hooks/use-toast';

interface PageProps {
  searchParams?: { email?: string };
}

function OTPVerification({ searchParams }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // Get email from URL query parameters if available
  const [email, setEmail] = useState(searchParams?.email || '');
  const [showEmailInput, setShowEmailInput] = useState(!searchParams?.email);
  
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(30);
    }
    
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.charAt(0);
    setOtp(newOtp);
    
    // Auto focus to next input if current input is filled
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace - clear current input and focus previous
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
    
    // Handle left arrow - focus previous input
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle right arrow - focus next input
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Only allow digits and max length of 6
    const sanitizedData = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    
    if (sanitizedData) {
      const newOtp = [...otp];
      for (let i = 0; i < sanitizedData.length; i++) {
        if (i < 6) {
          newOtp[i] = sanitizedData[i];
        }
      }
      setOtp(newOtp);
      
      // Focus last filled input or the next empty input
      const focusIndex = Math.min(sanitizedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };
  
  const handleResendOtp = async () => {
    if (resendDisabled) return;
    
    if (!email) {
      setShowEmailInput(true);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    
    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    try {
      setResendLoading(true);
      toast({
        title: 'Sending new OTP...',
        description: 'Please wait',
      });
      
      // API endpoint for sending verification code
      const response = await axios.post('/api/users/sendverification', { email });
      
      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'New OTP sent successfully!',
        });
        setResendDisabled(true);
        // Hide email input after successful resend
        setShowEmailInput(false);
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to send OTP',
          variant: 'destructive',
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again later.";
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Resend OTP error:', error);
    } finally {
      setResendLoading(false);
    }
  };
  
  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter the complete 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Email is required for verification',
        variant: 'destructive',
      });
      setShowEmailInput(true);
      return;
    }
    
    if (!validateEmail(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // API endpoint for verifying OTP
      const response = await axios.post('/api/users/verifyemail', { 
        email,
        code: otpValue
      });
      
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message || 'Account verified successfully!',
        });
        router.push('/login');
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Invalid OTP. Please try again.',
          variant: 'destructive',
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEmail = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      handleResendOtp();
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-100 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/30">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-6 relative">
            <button 
              onClick={() => router.back()} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-300 transition-colors"
            >
              <RiArrowLeftLine size={24} />
            </button>
            <h1 className="text-center text-3xl font-bold text-white">Verify Your Email</h1>
            <div className="w-16 h-1 bg-cyan-300 mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-900/30 rounded-full p-4">
                <RiShieldCheckLine size={40} className="text-indigo-400" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-medium text-gray-100 mb-2">OTP Verification</h2>
              {email && !showEmailInput ? (
                <p className="text-gray-300">
                  Enter the verification code sent to
                  <br />
                  <span className="text-cyan-400 font-medium">
                    {email}
                  </span>
                </p>
              ) : (
                <p className="text-gray-300">
                  Enter your email and we&lsquo;ll send you a
                  <br />
                  verification code
                </p>
              )}
            </div>
            
            {showEmailInput ? (
              <form onSubmit={handleSubmitEmail} className="mb-6">
                <div className="relative group mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-indigo-400">
                    <RiMailLine size={20} />
                  </div>
                  <input
                    ref={emailInputRef}
                    className="w-full py-3 pl-12 pr-3 rounded-xl bg-gray-700/40 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Your email address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div className="absolute h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-indigo-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></div>
                </div>
                
                <button 
                  type="submit"
                  disabled={resendLoading}
                  className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-500/30 ${resendLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {resendLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <>
                <div className="flex justify-center space-x-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      maxLength={1}
                      className="w-12 h-14 bg-gray-700/50 border border-gray-600 rounded-lg text-center text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleVerify}
                  disabled={isLoading}
                  className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-500/30 mb-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
              </>
            )}
            
            {!showEmailInput && (
              <div className="text-center mt-6">
                <p className="text-gray-400 mb-2">Didn&apos;t receive the code?</p>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleResendOtp}
                    disabled={resendDisabled || resendLoading}
                    className={`flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors ${(resendDisabled || resendLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <RiMailSendLine size={18} />
                    <span>
                      {resendDisabled 
                        ? `Resend in ${countdown}s` 
                        : (resendLoading ? 'Sending...' : 'Resend OTP')}
                    </span>
                  </button>
                  <button
                    onClick={() => setShowEmailInput(true)}
                    className="text-gray-400 hover:text-gray-300 mt-3 text-sm transition-colors"
                  >
                    Use a different email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
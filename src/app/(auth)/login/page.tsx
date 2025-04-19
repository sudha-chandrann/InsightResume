'use client';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine, RiLoginBoxLine } from 'react-icons/ri';

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = (): boolean => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive"
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter a password",
        variant: "destructive"
      });
      return false;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`/api/users/login`, formData);
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message || "Login successful!",
          variant: "default"
        });
        router.push('/dashboard');
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Login failed. Please try again.",
          variant: "destructive"
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again later.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/recovery-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-100 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/30">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-6">
            <h1 className="text-center text-3xl font-bold text-white">Sign In</h1>
            <div className="w-16 h-1 bg-cyan-300 mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-7">
              <p className="text-gray-300">
                Don&lsquo;t have an account?{" "}
                <span 
                  className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer transition-colors"
                  onClick={() => router.push('/register')}
                >
                  Create Account
                </span>
              </p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-5">              
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-indigo-400">
                  <RiMailLine size={20} />
                </div>
                <input
                  className="w-full py-3 pl-12 pr-3 rounded-xl bg-gray-700/40 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="absolute h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-indigo-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></div>
              </div>
              
              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-indigo-400">
                  <RiLockLine size={20} />
                </div>
                <input
                  className="w-full py-3 pl-12 pr-12 rounded-xl bg-gray-700/40 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-300 transition-colors"
                >
                  {showPassword ? (
                    <RiEyeOffLine size={20} />
                  ) : (
                    <RiEyeLine size={20} />
                  )}
                </button>
                <div className="absolute h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-indigo-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></div>
              </div>
              
              <div className="flex justify-end">
                <span 
                  className="text-sm text-blue-300 hover:text-blue-200 cursor-pointer transition-colors"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </span>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit"
                className={`w-full py-3.5 px-4 mt-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-500/30 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <RiLoginBoxLine className="mr-2" size={20} />
                    Sign In
                  </span>
                )}
              </button>
            </form>
            
            <div className="mt-8 border-t border-gray-700 pt-6">
            
              
              <div className="mt-6 text-center text-xs text-gray-400">
                By signing in, you agree to our
                <div className="mt-1">
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms of Service</a>
                  {" "}&{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
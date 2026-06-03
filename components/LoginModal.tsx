
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnView from "./Reveal/RevealOnView";
import { useUser } from "./UserContext";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
  selectedClass?: number;
}

interface LoginData {
  phone: string;
  otp: string;
  userRole: "student";
  selectedGrade: number;
  name: string;
  board: string;
  email: string;
}

const LoginModal = ({ isOpen, onClose, onLoginSuccess, selectedClass = 1 }: LoginModalProps) => {
  const { login, isLoggedIn, user } = useUser();
  const [step, setStep] = useState<'login' | 'otp' | 'register'>('login');
  const [loginData, setLoginData] = useState<LoginData>({
    phone: '',
    otp: '',
    userRole: 'student',
    selectedGrade: selectedClass,
    name: '',
    board: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is already logged in when modal opens
  useEffect(() => {
    if (isOpen && isLoggedIn && user) {
      onLoginSuccess(user);
      onClose();
    }
  }, [isOpen, isLoggedIn, user, onLoginSuccess, onClose]);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('login');
      setLoginData({
        phone: '',
        otp: '',
        userRole: 'student',
        selectedGrade: selectedClass,
        name: '',
        board: '',
        email: ''
      });
      setError(null);
      setOtpSent(false);
      setResendTimer(30);
      setCanResend(false);
      setIsNewUser(false);
    }
  }, [isOpen, selectedClass]);

  // Resend timer
  useEffect(() => {
    if (otpSent && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (otpSent && resendTimer === 0) {
      setCanResend(true);
    }
  }, [otpSent, resendTimer]);

  const validatePhoneNumber = (phone: string): boolean => {
    if (!/^\d+$/.test(phone)) return false;
    if (phone.length > 0 && parseInt(phone[0]) < 6) return false;
    return true;
  };

  const handleSendOTP = async () => {
    if (loginData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!validatePhoneNumber(loginData.phone)) {
      setError("Mobile number should start with 6, 7, 8, or 9");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First try to send OTP for login (existing users)
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: loginData.phone,
          userRole: loginData.userRole
        })
      });

      if (response.ok) {
        setOtpSent(true);
        setStep('otp');
        setResendTimer(30);
        setCanResend(false);
        setIsNewUser(false); // Existing user
      } else {
        const errorData = await response.json();
        //console.log('Login failed, error data:', errorData);

        // Check if user doesn't exist (new user)
        if (errorData.message && (errorData.message.includes("User not found") || errorData.message.includes("user not found"))) {
          //console.log('User not found, creating new user...');
          // Create new user first
          try {
            await createNewUser();
          } catch (createError) {
            //console.error('Failed to create user:', createError);
            throw createError;
          }
        } else {
          throw new Error(errorData.message || 'Failed to send OTP');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async () => {
    try {
      //console.log('Creating new user with phone:', loginData.phone, 'userRole:', loginData.userRole);

      // Generate a unique UUID for the user (matching your app)
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      const userData = {
        type: loginData.userRole,
        name: "Guest",
        email: "guest@gmail.com",
        phone: loginData.phone,
        grade: "1",
        password: "",
        board: "1",
        imageData: null,
        uuid: generateUUID(),
        educationBoardId: 1,
      };

      //console.log('Sending user creation request with data:', { ...userData, password: "[REDACTED]" });

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      //console.log('Create user response status:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        //console.log('User created successfully:', responseData);

        setOtpSent(true);
        setStep('otp');
        setResendTimer(30);
        setCanResend(false);
        setIsNewUser(true); // New user
      } else {
        const errorData = await response.json();
        //console.error('Create user failed:', errorData);
        throw new Error(errorData.error || errorData.message || 'Failed to create user');
      }
    } catch (err) {
      //console.error('Error in createNewUser:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to create user. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (loginData.otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VERIFY_OTP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: loginData.phone,
          otp: loginData.otp
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        //console.log('OTP verification successful, response data:', responseData);

        if (isNewUser) {
          // New user - show registration form
          setStep('register');
        } else {
          // Existing user - login successful
          // Extract user data from the response
          const userData = responseData.user || responseData;
          const token =
            responseData.token ||
            userData.token ||
            userData.accessToken ||
            userData.jwt ||
            responseData.token ||
            null;

          //console.log('User data:', userData);
          //console.log('Response data:', responseData);

          // Create proper user object for context
          const user = {
            id: userData.id || userData.userId || userData.uuid || 'temp_id',
            name: userData.name || userData.fullName || 'User',
            email: userData.email || '',
            phone: loginData.phone,
            grade: userData.grade || userData.selectedGrade || loginData.selectedGrade,
            board: userData.board || '',
            userRole: userData.userRole || loginData.userRole,
            token: token || undefined,
          };

          //console.log('Logging in existing user:', user);
          login(user);
          onLoginSuccess(user);
          onClose();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: loginData.phone,
          userRole: loginData.userRole
        })
      });

      if (response.ok) {
        setResendTimer(30);
        setCanResend(false);
        setError(null);
      } else {
        throw new Error('Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    if (!loginData.name.trim() || !loginData.email.trim() || !loginData.board.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COMPLETE_REGISTRATION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: loginData.phone,
          otp: loginData.otp,
          name: loginData.name,
          email: loginData.email,
          board: loginData.board,
          grade: loginData.selectedGrade,
          userRole: loginData.userRole
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        //console.log('Registration completed successfully, response data:', responseData);

        // Extract user data from the response
        const userData = responseData.user || responseData;
        const token =
          userData.token ||
          userData.accessToken ||
          userData.jwt ||
          responseData.token ||
          null;

        // Create user object for context
        const user = {
          id: userData.id || userData.userId || userData.uuid || 'temp_id',
          name: loginData.name,
          email: loginData.email,
          phone: loginData.phone,
          grade: loginData.selectedGrade,
          board: loginData.board,
          userRole: loginData.userRole,
          token: token || undefined,
        };

        //console.log('Logging in new user after registration:', user);
        login(user);
        onLoginSuccess(user);
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (err) {
      //console.error('LoginModal: registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-2 pb-4 px-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Sisya Class" width={48} height={48} className="w-12 h-12 rounded-[10px] object-contain" />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {step !== 'register' && (
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Login to Continue</h2>
              <p className="text-gray-600 text-sm mb-4">Please enter your phone number to login</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'login' ? (
            <RevealOnView from="bottom" durationMs={500}>
              <div className="space-y-6">
                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your phone number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                      <span className="text-gray-700 font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={loginData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setLoginData(prev => ({ ...prev, phone: value }));
                        setError(null);
                      }}
                      placeholder="Enter your phone number"
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Send OTP Button */}
                <button
                  onClick={handleSendOTP}
                  disabled={loading || loginData.phone.length !== 10}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading || loginData.phone.length !== 10
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>

                {/* Security Note */}
                <div className="text-center text-sm text-gray-500">
                  🔒 Your data is secure and encrypted
                </div>
              </div>
            </RevealOnView>
          ) : step === 'otp' ? (
            <RevealOnView from="bottom" durationMs={500}>
              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter 4-digit OTP
                  </label>
                  <div className="flex gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={loginData.otp[index] || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value) {
                            const newOtp = loginData.otp.split('');
                            newOtp[index] = value;
                            setLoginData(prev => ({ ...prev, otp: newOtp.join('') }));
                            setError(null);

                            // Auto-focus next input
                            if (index < 3) {
                              const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace') {
                            if (loginData.otp[index]) {
                              // If current input has value, clear it
                              const newOtp = loginData.otp.split('');
                              newOtp[index] = '';
                              setLoginData(prev => ({ ...prev, otp: newOtp.join('') }));
                            } else if (index > 0) {
                              // If current input is empty, go to previous input and clear it
                              const newOtp = loginData.otp.split('');
                              newOtp[index - 1] = '';
                              setLoginData(prev => ({ ...prev, otp: newOtp.join('') }));
                              const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                              prevInput?.focus();
                            }
                          }
                        }}
                        data-index={index}
                        className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    OTP sent to +91 {loginData.phone}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || loginData.otp.length !== 4}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading || loginData.otp.length !== 4
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                  <span className="text-sm text-gray-600">Didn't receive the code? </span>
                  <button
                    onClick={handleResendOTP}
                    disabled={!canResend || loading}
                    className={`text-sm font-medium ${canResend && !loading
                      ? 'text-blue-600 hover:text-blue-700'
                      : 'text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
                  </button>
                </div>

                {/* Back to Login */}
                <button
                  onClick={() => setStep('login')}
                  className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to login
                </button>
              </div>
            </RevealOnView>
          ) : (
            <RevealOnView from="bottom" durationMs={500}>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Your Registration</h3>
                  <p className="text-gray-600 text-sm">Please provide your details to continue</p>
                </div>

                {/* Registration Form */}
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={loginData.name}
                      onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* Board Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Board *
                    </label>
                    <select
                      value={loginData.board}
                      onChange={(e) => setLoginData(prev => ({ ...prev, board: e.target.value }))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select your board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                      <option value="IB">IB</option>
                      <option value="IGCSE">IGCSE</option>
                    </select>
                  </div>

                  {/* Grade Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade *
                    </label>
                    <select
                      value={loginData.selectedGrade}
                      onChange={(e) => setLoginData(prev => ({ ...prev, selectedGrade: parseInt(e.target.value) }))}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select your grade</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                        <option key={grade} value={grade}>Class {grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Register Button */}
                <button
                  onClick={handleCompleteRegistration}
                  disabled={loading || !loginData.name.trim() || !loginData.email.trim() || !loginData.board.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading || !loginData.name.trim() || !loginData.email.trim() || !loginData.board.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>

                {/* Back to OTP */}
                <button
                  onClick={() => setStep('otp')}
                  className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to OTP verification
                </button>
              </div>
            </RevealOnView>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

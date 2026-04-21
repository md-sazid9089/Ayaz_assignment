import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn({ onSignInSuccess, onNavigateToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes and clear errors
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  // Handle sign in submission
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Simulate loading state and API call
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      // Call the callback to navigate to dashboard
      if (onSignInSuccess) {
        onSignInSuccess({
          email,
          rememberMe,
        });
      }
      // Reset form
      setEmail('');
      setPassword('');
      setRememberMe(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Sign In to Your Account
            </h1>
            <p className="text-primary text-opacity-60 text-lg">
              Welcome back! Please enter your details to continue.
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 rounded-lg border-2 font-medium text-primary placeholder-primary placeholder-opacity-40 transition-all duration-300 focus:outline-none ${
                  emailError
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-light hover:border-accent focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20'
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2 font-medium animate-fadeIn">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 font-medium text-primary placeholder-primary placeholder-opacity-40 transition-all duration-300 focus:outline-none pr-12 ${
                    passwordError
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-light hover:border-accent focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20'
                  }`}
                />
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-opacity-60 hover:text-opacity-100 transition-all duration-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2 font-medium animate-fadeIn">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-light checked:bg-primary checked:border-primary text-white cursor-pointer transition-all duration-300 hover:border-accent focus:outline-none"
                />
                <span className="ml-2 text-sm font-medium text-primary text-opacity-70 group-hover:text-opacity-100 transition-all duration-300">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-accent hover:text-primary transition-all duration-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg font-bold py-3 mt-8 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8 pt-6 border-t border-light border-opacity-50">
            <p className="text-primary text-opacity-70">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToSignUp}
                className="font-bold text-accent hover:text-primary transition-all duration-300 cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Additional Help Text */}
          <div className="mt-8 p-4 bg-light rounded-lg text-center">
            <p className="text-sm text-primary text-opacity-60">
              Demo credentials: Use any email format and any password with 6+ characters
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="text-center mt-6 text-sm text-primary text-opacity-50">
          <p>This is a demo authentication page. No backend validation is performed.</p>
        </div>
      </div>
    </div>
  );
}

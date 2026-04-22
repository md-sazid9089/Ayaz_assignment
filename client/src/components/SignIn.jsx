import { useState } from 'react';
import { Eye, EyeOff, TrendingDown, ArrowRight, Mail, Lock, ChevronLeft } from 'lucide-react';

export default function SignIn({ onSignInSuccess, onNavigateToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignInSuccess) onSignInSuccess({ email, rememberMe });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5EDEC] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B9C4] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#533638] rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-[480px] relative z-10">
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(83,54,56,0.12)] border border-[#533638]/5 p-10 md:p-14 overflow-hidden relative group">
          {/* Subtle Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#533638] via-[#F7B9C4] to-[#533638]"></div>
          
          {/* Logo & Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#533638] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <TrendingDown size={28} className="text-[#F7B9C4]" />
              </div>
              <span className="text-3xl font-black text-[#533638] tracking-tighter font-['Outfit']">PEPTA</span>
            </div>
            <h1 className="text-4xl font-black text-[#533638] mb-3 font-['Outfit']">Welcome Back</h1>
            <p className="text-[#533638]/40 font-bold uppercase tracking-widest text-[10px]">
              Access your price tracking command center
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest px-1">Email Terminal</label>
              <div className="relative group/input">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="commander@pepta.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: ''}); }}
                  className={`w-full pl-14 pr-6 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                    errors.email ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[10px] font-black uppercase mt-1 px-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest">Access Key</label>
                <button type="button" className="text-[10px] font-black text-[#F7B9C4] hover:text-[#533638] uppercase tracking-widest transition-colors">Forgot Key?</button>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: ''}); }}
                  className={`w-full pl-14 pr-14 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                    errors.password ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#533638]/20 hover:text-[#533638] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[10px] font-black uppercase mt-1 px-1">{errors.password}</p>}
            </div>

            <div className="flex items-center gap-3 py-2">
              <label className="relative flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 border-2 border-[#533638]/10 rounded-lg bg-[#F5EDEC]/50 peer-checked:bg-[#533638] peer-checked:border-[#533638] transition-all duration-300"></div>
                <TrendingDown className="absolute left-1 top-1 text-[#F7B9C4] opacity-0 peer-checked:opacity-100 transition-opacity" size={16} />
                <span className="ml-3 text-sm font-bold text-[#533638]/60 group-hover:text-[#533638] transition-colors select-none">Stay Logged In</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#533638] text-white rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-500 shadow-xl shadow-[#533638]/10 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  SIGN IN TO SYSTEM
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-[#533638]/5 text-center">
            <p className="text-sm font-bold text-[#533638]/40">
              New to the system?{' '}
              <button
                onClick={onNavigateToSignUp}
                className="text-[#533638] hover:text-[#F7B9C4] transition-colors border-b-2 border-[#F7B9C4]"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="mt-8 mx-auto flex items-center gap-2 text-[10px] font-black text-[#533638]/30 hover:text-[#533638] uppercase tracking-[0.2em] transition-all"
        >
          <ChevronLeft size={14} />
          Return to Launchpad
        </button>
      </div>
    </div>
  );
}

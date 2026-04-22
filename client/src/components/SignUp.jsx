import { useState } from 'react';
import { Eye, EyeOff, TrendingDown, ArrowRight, User, Mail, Lock, ChevronLeft } from 'lucide-react';

export default function SignUp({ onSignUpSuccess, onNavigateToSignIn }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignUpSuccess) onSignUpSuccess({ fullName: formData.fullName, email: formData.email });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5EDEC] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F7B9C4] rounded-full blur-[120px] opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#533638] rounded-full blur-[120px] opacity-10 translate-y-1/2 translate-x-1/2"></div>

      <div className="w-full max-w-[520px] relative z-10">
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(83,54,56,0.12)] border border-[#533638]/5 p-10 md:p-14 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F7B9C4] via-[#533638] to-[#F7B9C4]"></div>
          
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#533638] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <TrendingDown size={28} className="text-[#F7B9C4]" />
              </div>
              <span className="text-3xl font-black text-[#533638] tracking-tighter font-['Outfit']">PEPTA</span>
            </div>
            <h1 className="text-4xl font-black text-[#533638] mb-3 font-['Outfit']">Initialize Account</h1>
            <p className="text-[#533638]/40 font-bold uppercase tracking-widest text-[10px]">
              Join the elite price monitoring network
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest px-1">Full Identity</label>
                <div className="relative group/input">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Commander"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-14 pr-6 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                      errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest px-1">Email Terminal</label>
                <div className="relative group/input">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="commander@pepta.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-14 pr-6 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest px-1">Security Key</label>
                <div className="relative group/input">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold text-sm placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                      errors.password ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                    }`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#533638]/20 hover:text-[#533638]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#533638]/40 uppercase tracking-widest px-1">Confirm Key</label>
                <div className="relative group/input">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#533638]/20 group-focus-within/input:text-[#533638] transition-colors" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-4 bg-[#F5EDEC]/50 border-2 rounded-2xl text-[#533638] font-bold text-sm placeholder-[#533638]/20 focus:outline-none transition-all duration-300 ${
                      errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-[#F7B9C4] focus:bg-white'
                    }`}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#533638]/20 hover:text-[#533638]">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#533638] text-white rounded-3xl font-black text-sm flex items-center justify-center gap-3 hover:bg-[#F7B9C4] hover:text-[#533638] transition-all duration-500 shadow-xl shadow-[#533638]/10 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  INITIALIZE ACCOUNT
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#533638]/5 text-center">
            <p className="text-sm font-bold text-[#533638]/40">
              Already in the system?{' '}
              <button
                onClick={onNavigateToSignIn}
                className="text-[#533638] hover:text-[#F7B9C4] transition-colors border-b-2 border-[#F7B9C4]"
              >
                Sign In
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

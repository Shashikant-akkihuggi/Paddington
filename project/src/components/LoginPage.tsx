import React, { useState } from 'react';
import { User, Mail, Lock, Heart, Shield, UserCheck, Stethoscope, Activity, Users } from 'lucide-react';

interface User {
  email: string;
  role: 'patient' | 'doctor';
  name: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'patient' as 'patient' | 'doctor'
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!formData.email || !formData.password) {
      setErrors(['Please fill in all required fields']);
      setIsLoading(false);
      return;
    }

    if (!isLogin && !formData.name) {
      setErrors(['Please enter your name']);
      setIsLoading(false);
      return;
    }

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin({ email: user.email, role: user.role, name: user.name });
      } else {
        setErrors(['Invalid email or password']);
      }
    } else {
      // Registration logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === formData.email);
      
      if (existingUser) {
        setErrors(['Email already registered']);
        setIsLoading(false);
        return;
      }

      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      onLogin({ email: newUser.email, role: newUser.role, name: newUser.name });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Medical pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <Heart className="w-4 h-4 text-white animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Branding */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl animate-bounce">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Health<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Card</span>
              </h1>
              <p className="text-xl text-blue-200 max-w-md mx-auto lg:mx-0">
                Your comprehensive digital health identity system for modern healthcare management
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 text-blue-200">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Real-time Access</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Multi-role Support</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm">Emergency Ready</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-blue-200">
                  {isLogin ? 'Sign in to access your health dashboard' : 'Join our secure health platform'}
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex mb-8 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isLogin
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    !isLogin
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="animate-slide-down">
                    <label className="block text-sm font-medium text-blue-200 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="animate-slide-down">
                    <label className="block text-sm font-medium text-blue-200 mb-3">
                      Select Your Role
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'patient' })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.role === 'patient'
                            ? 'border-blue-400 bg-blue-500/20 text-white transform scale-105 shadow-lg'
                            : 'border-white/20 bg-white/5 text-blue-200 hover:border-white/40'
                        }`}
                      >
                        <User className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm font-medium">Patient</div>
                        <div className="text-xs opacity-75">Manage your health</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'doctor' })}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.role === 'doctor'
                            ? 'border-green-400 bg-green-500/20 text-white transform scale-105 shadow-lg'
                            : 'border-white/20 bg-white/5 text-blue-200 hover:border-white/40'
                        }`}
                      >
                        <Stethoscope className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm font-medium">Doctor</div>
                        <div className="text-xs opacity-75">Manage patients</div>
                      </button>
                    </div>
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="animate-shake bg-red-500/20 border border-red-400/50 rounded-xl p-4 backdrop-blur-sm">
                    {errors.map((error, index) => (
                      <p key={index} className="text-red-200 text-sm">{error}</p>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-blue-200 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                  >
                    {isLogin ? 'Register here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
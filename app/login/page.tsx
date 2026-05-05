import { login, signup } from './actions';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 sm:px-6">
      
      {/* Background ambient glow effect*/}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-tight hover:opacity-80 transition-opacity mb-2">
            Client<span className="text-blue-500">Manager</span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mt-4">Welcome Back</h1>
          <p className="text-sm text-gray-400 mt-2">Sign in to your workspace</p>
        </div>

        {/*Form Card */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <form className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Buttons Area */}
            <div className="pt-2 space-y-3 flex flex-col">
              <button
                formAction={login}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
              >
                Sign In
              </button>
              
              <div className="relative py-2 flex items-center">
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">or</span>
                <div className="flex-grow border-t border-gray-800"></div>
              </div>

              <button
                formAction={signup}
                className="w-full bg-transparent hover:bg-gray-800/50 text-gray-300 border border-gray-700 font-medium py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
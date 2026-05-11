import { signup } from './actions';
import Link from 'next/link';
import { SubmitButton } from '@/components/submit-button';

export default async function SignupPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ message?: string; type?: string }> 
}) {
  const resolvedParams = await searchParams;
  const message = resolvedParams?.message;
  const type = resolvedParams?.type || 'error';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 sm:px-6 relative">
      
      <Link 
        href="/" 
        className="absolute top-6 left-6 sm:top-10 sm:left-10 text-gray-500 hover:text-white flex items-center gap-2 transition-colors group z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Background ambient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black text-white tracking-tight hover:opacity-80 transition-opacity mb-2">
            Client<span className="text-blue-500">Manager</span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mt-4">Create an Account</h1>
          <p className="text-sm text-gray-400 mt-2">Start managing your clients today.</p>
        </div>

        <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <form action={signup} className="space-y-6">
            
            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium border ${
                type === 'success' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" required placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
              <input
                id="password" name="password" type="password" required placeholder="••••••••" minLength={6}
                className="w-full px-4 py-3.5 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <SubmitButton loadingText="Creating account...">
                Sign Up
              </SubmitButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
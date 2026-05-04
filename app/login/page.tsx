import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>;
}) {
  // Await the searchParams for Next.js 15
  const searchParams = await props.searchParams;
  
  // Server Action for Logging In
  const signIn = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/dashboard/template');
  };

  // Server Action for Signing Up
  const signUp = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not sign up user');
    }

    return redirect('/dashboard/template');
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-gray-900">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <label className="text-md font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <label className="text-md font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button
          formAction={signIn}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-medium mb-2"
        >
          Sign In
        </button>
        
        <button
          formAction={signUp}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 rounded-md px-4 py-2 font-medium mb-2"
        >
          Sign Up
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-50 text-red-600 text-center rounded-md border border-red-200">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
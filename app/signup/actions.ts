'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (password.length < 6) {
    return redirect('/signup?message=Password must be at least 6 characters long.&type=error');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect(`/signup?message=${error.message}&type=error`);
  }

  // If successful, send to the dashboard
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
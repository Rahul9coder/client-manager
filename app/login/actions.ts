'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // Grab the values from your input fields
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Send them to Supabase securely
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // If they type the wrong password, send them back to the login page
    return redirect('/login?message=Could not authenticate user');
  }

  // If successful, clear the cache and send them to their workspace!
  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not create user');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
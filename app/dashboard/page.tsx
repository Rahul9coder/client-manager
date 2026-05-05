import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; // <-- 1. Added redirect import
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If the user isn't logged in, send them back to the login page safely
  if (!user) {
    return redirect('/login');
  }

  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id);

  // Server Action to delete a client
  async function deleteClient(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('client_id');
    await supabase.from('clients').delete().eq('id', id);
    revalidatePath('/dashboard');
  }

  // 2. Server Action to Log Out
  async function signOut() {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      
      <div className="mb-4">
        <Link 
          href="/" 
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* 3. Updated Header Area with Log Out Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Clients</h1>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/dashboard/template" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Template
          </Link>
          <Link 
            href="/dashboard/clients/new" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Client
          </Link>
          <form action={signOut}>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 transition-colors"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>

      {(!clients || clients.length === 0) ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
          <p className="text-gray-500 mb-4">You haven't added any clients yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  client.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  client.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {client.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                {client.project_summary || 'No summary provided.'}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Link 
                  href={`/dashboard/clients/${client.id}`} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Summary &rarr;
                </Link>
                
                <form action={deleteClient}>
                  <input type="hidden" name="client_id" value={client.id} />
                  <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
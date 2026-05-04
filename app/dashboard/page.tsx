import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all clients belonging to this user
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user?.id);

  // Server Action to delete a client
  async function deleteClient(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('client_id');
    await supabase.from('clients').delete().eq('id', id);
    revalidatePath('/dashboard');
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Clients</h1>
        <div className="flex gap-4">
          <Link 
            href="/dashboard/template" 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Edit Template
          </Link>
          <Link 
            href="/dashboard/clients/new" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            + Add Client
          </Link>
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
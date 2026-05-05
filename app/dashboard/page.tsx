import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Fetch clients
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)

  // Delete Client
  async function deleteClient(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const id = formData.get('client_id');
    await supabase.from('clients').delete().eq('id', id);
    revalidatePath('/dashboard');
  }

  // Sign Out
  async function signOut() {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
  }

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
      case 'Completed': return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20';
      default: return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
            Client<span className="text-blue-600">Manager</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-500 hidden sm:block">
              {user.email}
            </span>
            <form action={signOut}>
              <button 
                type="submit" 
                className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
              >
                Log Out &rarr;
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-8">
        
        {/* Workspace Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Workspace</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your clients and generate professional summaries.</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Link 
              href="/dashboard/template" 
              className="flex-1 sm:flex-none justify-center inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
            >
              ⚙️ Settings
            </Link>
            <Link 
              href="/dashboard/clients/new" 
              className="flex-1 sm:flex-none justify-center inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20"
            >
              + New Client
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {(!clients || clients.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              📂
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No clients yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6 text-sm">
              Get started by creating your first client profile. You can generate a summary document immediately after!
            </p>
            <Link 
              href="/dashboard/clients/new" 
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              Add Your First Client
            </Link>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Client Cards Grid */}
            {clients.map((client) => (
              <div 
                key={client.id} 
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">{client.name}</h2>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(client.status)}`}>
                    {client.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-8 flex-1 leading-relaxed">
                  {client.project_summary || 'No project summary provided yet.'}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                  <Link 
                    href={`/dashboard/clients/${client.id}`} 
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:underline"
                  >
                    View Document &rarr;
                  </Link>
                  
                  <form action={deleteClient}>
                    <input type="hidden" name="client_id" value={client.id} />
                    <button 
                      type="submit" 
                      className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Client"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
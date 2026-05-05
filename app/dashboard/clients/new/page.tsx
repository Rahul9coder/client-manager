import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewClientPage() {
  
  // Server Action to securely save the new client
  async function addClient(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/login');

    await supabase.from('clients').insert({
      user_id: user.id,
      name: formData.get('name'),
      status: formData.get('status'),
      project_summary: formData.get('project_summary'),
      goals: formData.get('goals'),
    });

    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4 inline-flex items-center gap-2"
          >
            &larr; Back to Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Client</h1>
          <p className="text-gray-500 mt-2">Enter the project details below to generate a new workspace document.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form action={addClient} className="p-8 sm:p-10 space-y-8">
            
            {/* Two Column Grid for Name and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Client / Project Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="e.g. Acme Corp Redesign"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Current Status
                </label>
                <select 
                  name="status" 
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white cursor-pointer appearance-none"
                >
                  <option value="Active">🟢 Active</option>
                  <option value="Paused">🟡 Paused</option>
                  <option value="Completed">⚪ Completed</option>
                </select>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Large Text Areas */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Project Summary
              </label>
              <textarea 
                name="project_summary" 
                rows={4}
                placeholder="Briefly describe what this project is about and the main problems you are solving..."
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Key Goals & Deliverables
              </label>
              <textarea 
                name="goals" 
                rows={4}
                placeholder="What are the main objectives? (e.g., 1. Launch MVP, 2. Increase user conversion by 15%)"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white focus:bg-white resize-y"
              ></textarea>
            </div>

            {/* Footer Action Area */}
            <div className="pt-6 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all text-center"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 rounded-xl transition-all shadow-blue-600/20 shadow-md"
              >
                Save Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
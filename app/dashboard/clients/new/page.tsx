import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function NewClientPage() {
  
  // Server Action to save the new client to Supabase
  async function createClientAction(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('clients').insert({
      user_id: user?.id,
      name: formData.get('name'),
      status: formData.get('status'),
      project_summary: formData.get('project_summary'),
      goals: formData.get('goals'),
    });

    // Send the user back to the dashboard after saving
    redirect('/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </Link>
      </div>

      <form action={createClientAction} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client / Project Name</label>
          <input 
            type="text" 
            name="name" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select 
            name="status" 
            defaultValue="Active"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900"
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Summary</label>
          <textarea 
            name="project_summary" 
            rows={4}
            placeholder="Brief overview of the project..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Goals</label>
          <textarea 
            name="goals" 
            rows={4}
            placeholder="What are the key deliverables or milestones?"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900" 
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          Save Client
        </button>
      </form>
    </div>
  );
}
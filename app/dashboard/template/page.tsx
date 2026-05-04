import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export default async function TemplatePage() {
  // Added 'await' here
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch the user's current template settings from the database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  // Next.js Server Action to save the updated template
  async function updateTemplate(formData: FormData) {
    'use server';
    // Added 'await' here as well
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from('profiles').upsert({
      id: user?.id,
      specialization: formData.get('specialization'),
      work_style: formData.get('work_style'),
      default_sections: formData.get('default_sections'),
    });
    
    revalidatePath('/dashboard/template');
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">My Profile Template</h1>
      <form action={updateTemplate} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input 
            type="text" 
            name="specialization" 
            defaultValue={profile?.specialization || ''} 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Style</label>
          <select 
            name="work_style" 
            defaultValue={profile?.work_style || 'Hybrid'} 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900"
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Default Sections (Comma separated)</label>
          <input 
            type="text" 
            name="default_sections" 
            defaultValue={profile?.default_sections || 'Overview, Goals, Notes'} 
            placeholder="e.g. Overview, Goals, Notes" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900" 
          />
          <p className="text-xs text-gray-500 mt-1">These will become the headers on your client summaries.</p>
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Save Template
        </button>
      </form>
    </div>
  );
}
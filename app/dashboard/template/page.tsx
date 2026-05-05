import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SubmitButton } from '@/components/SubmitButton';

export default async function TemplatePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Fetch the user's existing template (if they have one)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Server Action to save the template
  async function saveTemplate(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    // "upsert" means: Update it if it exists, Insert it if it doesn't.
    // Because we use the user.id as the primary key, it guarantees ONE template per user.
    await supabase.from('profiles').upsert({
      id: user.id,
      specialization: formData.get('specialization'),
      work_style: formData.get('work_style'),
      default_sections: formData.get('default_sections'),
    });

    // Send them back to the dashboard after saving
    redirect('/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10 border border-gray-100">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Your Client Template</h1>
        <Link 
          href="/dashboard" 
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <p className="text-gray-600 mb-8">
        Customize how your client summaries will be generated. These settings will be applied to every client you add.
      </p>

      <form action={saveTemplate} className="space-y-6">
        {/* Field 1: Specialization (Text) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <input 
            type="text" 
            name="specialization" 
            defaultValue={profile?.specialization || ''}
            placeholder="e.g. Web Development, Graphic Design, Consulting"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required
          />
        </div>

        {/* Field 2: Work Style (Dropdown) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Style
          </label>
          <select 
            name="work_style" 
            defaultValue={profile?.work_style || 'Hybrid'}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Field 3: Default Sections (Comma-separated text) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Sections (Comma-separated)
          </label>
          <input 
            type="text" 
            name="default_sections" 
            defaultValue={profile?.default_sections || 'Overview, Goals, Notes'}
            placeholder="e.g. Overview, Goals, Notes"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            These sections will automatically be generated for every new client document.
          </p>
        </div>

        <SubmitButton defaultText="Save Template" loadingText="Saving..."/> 
          Save Template
      </form>
    </div>
  );
}
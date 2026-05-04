import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function ClientSummary({ params }: { params: { id: string } }) {
  // Added 'await' here
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [clientRes, profileRes] = await Promise.all([
    supabase.from('clients').select('*').eq('id', params.id).eq('user_id', user?.id).single(),
    supabase.from('profiles').select('*').eq('id', user?.id).single()
  ]);

  if (!clientRes.data) return notFound();

  const client = clientRes.data;
  const profile = profileRes.data;
  const sections = profile?.default_sections?.split(',').map((s: string) => s.trim()) || [];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-100 mt-8">
      <header className="border-b pb-6 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">{client.name}</h1>
        <div className="mt-3 flex gap-4 text-sm text-gray-500">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            Status: {client.status}
          </span>
          {profile?.specialization && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Specialization: {profile.specialization}
            </span>
          )}
          {profile?.work_style && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Style: {profile.work_style}
            </span>
          )}
        </div>
      </header>

      <div className="space-y-8 text-gray-800">
        {sections.map((section: string, index: number) => {
          let content = "No notes provided.";
          if (section.toLowerCase().includes('overview') || section.toLowerCase().includes('summary')) {
            content = client.project_summary;
          } else if (section.toLowerCase().includes('goal')) {
            content = client.goals;
          }

          return (
            <section key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">{section}</h2>
              <p className="whitespace-pre-wrap">{content}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
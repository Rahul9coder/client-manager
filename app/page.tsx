import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Manage Your Clients <br />
          <span className="text-blue-600">With Confidence</span>
        </h1>
        
        <p className="text-lg text-gray-600">
          A simple, elegant way to keep track of client projects, goals, and summaries. 
          Set up your custom template and keep everything organized in one place.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Log In / Sign Up
          </Link>
          
          {/* We updated this link to go straight to the main Client Dashboard */}
          <Link 
            href="/dashboard" 
            className="inline-block bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
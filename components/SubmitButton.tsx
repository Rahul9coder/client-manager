'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ defaultText, loadingText }: { defaultText: string; loadingText: string }) {
  // useFormStatus automatically detects if the parent <form> is currently running a Server Action
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium mt-4 shadow-sm"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          {/* A simple CSS loading spinner */}
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </span>
      ) : (
        defaultText
      )}
    </button>
  );
}
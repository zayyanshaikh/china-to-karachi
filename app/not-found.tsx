import Link from 'next/link';
import { ArrowLeft, PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4">
        <PackageX className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Import Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm mb-6">
        The requested import category or product could not be located in our Port Qasim cargo registry.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Karachi Main Hub</span>
      </Link>
    </div>
  );
}

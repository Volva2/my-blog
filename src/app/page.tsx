import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Dashboard from '@/components/Dashboard'; // The component we built previously

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* 1. Header Section (Amelia Style: Big Serif Typography) */}
      <header className="mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-stone-800 font-bold tracking-tight mb-4">
          Zakir Neji
        </h1>
        <p className="text-xl text-stone-500 font-sans max-w-2xl">
          Digital gardener, developer, and data hoarder. 
          Exploring the intersection of <span className="text-accent italic">design</span> and <span className="text-accent italic">systems</span>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* 2. Main Column: The Blog Index (Dan Luu Style: High Signal/Noise) */}
        <section className="md:col-span-8 space-y-10">
          <div className="flex items-center space-x-2 mb-8">
             <span className="h-px bg-stone-300 flex-1"></span>
             <span className="text-stone-400 uppercase tracking-widest text-xs font-bold">Writing</span>
             <span className="h-px bg-stone-300 flex-1"></span>
          </div>

          <ul className="space-y-8">
            {allPostsData.map(({ id, date, title, description }) => (
              <li key={id} className="group cursor-pointer">
                <Link href={`/posts/${id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                    <h3 className="text-2xl font-serif text-stone-800 group-hover:text-accent transition-colors duration-200">
                      {title}
                    </h3>
                    <time className="font-mono text-xs text-stone-400 shrink-0 mt-1 md:mt-0">
                      {date}
                    </time>
                  </div>
                  <p className="text-stone-600 leading-relaxed max-w-prose">
                    {description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Sidebar: The "Live" Dashboard (Your custom feature) */}
        <aside className="md:col-span-4 space-y-8">
          
          {/* Dashboard Component */}
          <Dashboard />

          {/* Optional: "Currently" Section (Amelia/Now Page Style) */}
          <div className="bg-paper p-6 rounded-lg border border-stone-100">
             <h4 className="font-bold text-stone-500 uppercase tracking-widest text-xs mb-4">Currently</h4>
             <ul className="text-sm space-y-3 text-stone-600">
               <li>📖 Reading: <strong>Think - Simon Blackburn</strong></li>
               <li>🎵 Listening: <strong>Up - Earthgang</strong></li>
               <li>🔨 Building: <strong>This website</strong></li>
             </ul>
          </div>

        </aside>
      </div>
    </main>
  );
}

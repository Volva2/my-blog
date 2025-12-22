import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const allNoteData = getSortedPostsData().filter(p => p.type === 'note');
  const allBookData = getSortedPostsData().filter(p => p.type === 'book');
  const allEssayData = getSortedPostsData().filter(p => p.type === 'essay');

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* 1. Header Section (Amelia Style: Big Serif Typography) */}
      <header className="mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-stone-800 font-bold tracking-tight mb-4">
          Zakir Neji
        </h1>
        <p className="text-xl text-stone-500 font-sans max-w-2xl">
          Dumb Hooman
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* 2. Main Column: The Blog Index (Dan Luu Style: High Signal/Noise) */}
        <section className="md:col-span-8 space-y-10">
          <div className="flex items-center space-x-2 mb-8">
             <span className="h-px bg-stone-300 flex-1"></span>
             <span className="text-stone-400 uppercase tracking-widest text-xs font-bold">Essays</span>
             <span className="h-px bg-stone-300 flex-1"></span>
          </div>

          <ul className="space-y-8">
            {allEssayData.map(({ id, date, title, description }) => (
              <li key={id} className="group mb-8">
                <Link href={`/posts/${id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                    {/* group-hover:underline -> Underlines when you hover the parent <li>
                      decoration-accent -> Uses your custom accent color
                      decoration-2 -> Makes the line thicker
                      underline-offset-4 -> Pushes the line down for readability
                    */}
                    <h3 className="text-2xl font-serif text-stone-800 transition-colors group-hover:underline decoration-accent decoration-2 underline-offset-4">
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

        <aside className="md:col-span-4 space-y-8">
          <div className="flex items-center space-x-2 mb-8">
            <span className="h-px bg-stone-300 flex-1"></span>
            <span className="text-stone-400 uppercase tracking-widest text-xs font-bold">Notes</span>
            <span className="h-px bg-stone-300 flex-1"></span>
          </div>

          <ul className="space-y-8">
            {allNoteData.map(({ id, date, title, description }) => (
              <li key={id} className="group mb-8">
                <Link href={`/posts/${id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                    {/* group-hover:underline -> Underlines when you hover the parent <li>
                      decoration-accent -> Uses your custom accent color
                      decoration-2 -> Makes the line thicker
                      underline-offset-4 -> Pushes the line down for readability
                    */}
                    <h3 className="text-2xl font-serif text-stone-800 transition-colors group-hover:underline decoration-accent decoration-2 underline-offset-4">
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
        </aside>

        <section className="md:col-span-12 space-y-10">
          <div className="flex items-center space-x-2 mb-8">
             <span className="h-px bg-stone-300 flex-1"></span>
             <span className="text-stone-400 uppercase tracking-widest text-xs font-bold">Writing</span>
             <span className="h-px bg-stone-300 flex-1"></span>
          </div>

          <ul className="space-y-12">
            {allBookData.map(({ id, date, title, description, cover}) => (
              <li key={id} className="group mb-8">
                <Link href={`/posts/${id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                      <img src={`/images/book_covers/${cover}`} className='rounded-md transition-transform duration-300 transform hover:scale-110' alt={title} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

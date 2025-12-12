import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-12">
      {/* Blog Column */}
      <section className="md:col-span-8">
        <h1 className="text-4xl font-serif font-bold mb-8">My Blog</h1>
        <div className="prose prose-stone">
          <p>Posts will appear here later.</p>
        </div>
      </section>

      {/* Sidebar Column */}
      <aside className="md:col-span-4">
        <Dashboard />
      </aside>
    </main>
  );
}

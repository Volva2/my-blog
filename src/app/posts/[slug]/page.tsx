import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';


export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  // Check if directory exists to avoid build crash on fresh clone
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ''),
  }));
}

// 1. Update the Props Type to use Promise
type Props = {
  params: Promise<{ slug: string }>
}

// 2. Async function matches the new type
export default async function Post({ params }: Props) {
  // 3. CRITICAL FIX: Await the params object
  const { slug } = await params;
  
  const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
  
  // Handle 404 if file doesn't exist (optional safety)
  if (!fs.existsSync(fullPath)) {
    return <div>Post not found</div>;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContents);

  // Define the Highlight Options
  const options = {
    theme: 'github-dark', // or 'one-dark-pro', 'dracula', etc.
    keepBackground: true,
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm font-mono text-stone-500 hover:text-stone-800 transition-colors">
          ← Back to Garden
        </Link>
      </div>

      <header className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
          {data.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm font-mono text-stone-500">
          <time>{data.date}</time>
          {data.tags && (
            <>
              <span>•</span>
              <div className="flex space-x-2">
                {data.tags.map((tag: string) => (
                  <span key={tag} className="bg-stone-100 px-2 py-1 rounded-sm text-stone-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-stone prose-lg prose-headings:font-serif prose-a:text-accent hover:prose-a:text-red-600">
        <MDXRemote 
          source={content} 
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                [rehypePrettyCode, options],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}


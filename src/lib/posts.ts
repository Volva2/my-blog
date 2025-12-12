import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// DEBUG 1: Print the current working directory
console.log("Current Working Directory:", process.cwd());

const postsDirectory = path.join(process.cwd(), 'content/posts');

// DEBUG 2: Print the target path
console.log("Target Post Directory:", postsDirectory);

export type PostData = {
  id: string;
  date: string;
  title: string;
  description?: string;
  tags?: string[];
};

export function getSortedPostsData() {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.error(`ERROR: Directory not found at ${postsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  // DEBUG 3: Print found files
  console.log("Found Files:", fileNames);

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx')) // Filter non-MDX files
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      } as PostData;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

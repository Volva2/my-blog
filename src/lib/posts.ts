import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Print the current working directory
console.log("Current Working Directory:", process.cwd());

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Print the target path
console.log("Target Post Directory:", postsDirectory);

export type PostData = {
  id: string;
  type: string;
  date: string;
  title: string;
  cover?: string;
  description?: string;
  tags?: string[];
};

/**
 * 
 * @returns An array of 
 */
export function getSortedPostsData() {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.error(`ERROR: Directory not found at ${postsDirectory}`);
    return [];
  }


  const fileNames = fs.readdirSync(postsDirectory);
  
  // Print found files
  // console.log("Found Files:", fileNames);

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx')) // Filter non-MDX files
    .map( fileName => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8'); // returns string/buffer of file contents
      const matterResult = matter(fileContents); // gets yaml

      // returns a new array of all the data
      return {
        id,
        ...matterResult.data,
      } as PostData;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

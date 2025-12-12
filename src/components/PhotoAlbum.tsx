import React from 'react';
import Image from 'next/image';

type PhotoAlbumProps = {
  images: Array<{ src: string; alt: string }>;
  columns?: 1 | 2 | 3 | 4;
  layout?: 'normal' | 'wide' | 'full'; // New Prop
};

export default function PhotoAlbum({ 
  images, 
  columns = 2, 
  layout = 'normal' 
}: PhotoAlbumProps) {

  // 1. Define the grid columns logic
  let gridCols = 'grid-cols-1 md:grid-cols-2';
  if (columns === 1) gridCols = 'grid-cols-2 md:grid-cols-1';
  if (columns === 3) gridCols = 'grid-cols-2 md:grid-cols-3';
  if (columns === 4) gridCols = 'grid-cols-2 md:grid-cols-4';

  // 2. Define the "Breakout" styles
  let widthStyles = 'w-full'; // Default: fits in text column

  if (layout === 'wide') {
    // Pulls the album 6rem (96px) outside the text column on desktop
    // On mobile, it stays normal width
    widthStyles = 'md:w-[120%] md:-ml-[10%]';
  } 
  
  if (layout === 'full') {
    // The "Full Bleed" Magic Spell
    // 1. w-screen: Force width to be the viewport width
    // 2. left-1/2...: Centers it relative to the viewport
    // 3. px-6: Adds a little padding so images don't touch the literal browser edge
    widthStyles = 'w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 md:px-12';
  }

  return (
    <div className={`my-12 ${widthStyles}`}>
      <div className={`grid gap-1 ${gridCols}`}>
        {images.map((img, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg bg-stone-100">
            <Image
              src={img.src}
              alt={img.alt}
              width={1200} // Increased resolution for larger layouts
              height={800}
              className="object-cover w-full h-full hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

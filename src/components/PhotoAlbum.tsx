import React from 'react';
import Image from 'next/image';

type PhotoAlbumProps = {
  // We accept an array of image paths
  images: Array<{ src: string; alt: string }>;
  columns?: 2 | 3;
};

export default function PhotoAlbum({ images, columns = 2 }: PhotoAlbumProps) {
  return (
    <div className={`grid gap-4 my-8 ${columns === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
      {images.map((img, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg">
          <Image
            src={img.src}
            alt={img.alt}
            width={600}
            height={400}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
}

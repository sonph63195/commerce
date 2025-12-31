"use client";

import React, { useState } from "react";

type Props = {
  images?: string[];
  className?: string;
};

export function ProductGallery({ images = [], className = "" }: Props) {
  const [mainIndex, setMainIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="w-full h-[420px] bg-gray-100 rounded-md overflow-hidden">
        <img src={images[mainIndex]} alt={`Product image ${mainIndex + 1}`} className="w-full h-full object-contain" />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((img, idx) => (
            <button key={img} onClick={() => setMainIndex(idx)} className="focus:outline-none">
              <img src={img} alt={`thumbnail-${idx}`} className={`w-full h-20 object-cover rounded-md border ${idx === mainIndex ? 'ring-2 ring-primary' : ''}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

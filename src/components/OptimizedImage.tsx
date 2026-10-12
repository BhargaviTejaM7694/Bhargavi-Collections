"use client";

import { useState } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

function isOptimizable(src: string) {
  return src.startsWith("https://") || src.startsWith("/");
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  priority = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (isOptimizable(src)) {
    return (
      <div className="relative w-full h-full">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : (width ?? 400)}
          height={fill ? undefined : (height ?? 400)}
          fill={fill}
          className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
          quality={quality}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

import { useState, useEffect } from "react";

function LazyImage({ src, alt, className }) {
  const [imageSrc, setImageSrc] = useState("placeholder.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      loading="lazy"
    />
  );
}

export default LazyImage;

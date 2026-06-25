"use client";

import { useEffect, useRef, useState } from "react";
import AdWrapper from "./AdWrapper";

export default function Banner728x90() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear out any previous content (avoids duplicates on re-render/HMR)
    containerRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '645bbec6e1a27d9c36cd2c6269e52b66',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/645bbec6e1a27d9c36cd2c6269e52b66/invoke.js";
    invokeScript.async = true;
    containerRef.current.appendChild(invokeScript);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <AdWrapper className="hidden md:block">
      <div ref={containerRef} style={{ width: 728, height: 90 }} />
    </AdWrapper>
  );
}
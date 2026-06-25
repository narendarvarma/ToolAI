"use client";

import { useEffect, useState } from "react";
import AdWrapper from "./AdWrapper";

export default function Banner728x90() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Global Adsterra configuration
    (window as any).atOptions = {
      key: "645bbec6e1a27d9c36cd2c6269e52b66",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/645bbec6e1a27d9c36cd2c6269e52b66/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();

      // Cleanup
      delete (window as any).atOptions;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AdWrapper className="hidden md:block">
      {/* Adsterra injects the iframe automatically */}
    </AdWrapper>
  );
}
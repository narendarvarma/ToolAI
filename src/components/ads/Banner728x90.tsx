"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import AdWrapper from "./AdWrapper";

export default function Banner728x90() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AdWrapper className="hidden md:block">
      {/* Ad configuration */}
      <Script
        id="adsterra-banner-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.atOptions = {
              key: '645bbec6e1a27d9c36cd2c6269e52b66',
              format: 'iframe',
              height: 90,
              width: 728,
              params: {}
            };
          `,
        }}
      />

      {/* Ad loader */}
      <Script
        id="adsterra-banner-loader"
        src="https://www.highperformanceformat.com/645bbec6e1a27d9c36cd2c6269e52b66/invoke.js"
        strategy="afterInteractive"
      />
    </AdWrapper>
  );
}
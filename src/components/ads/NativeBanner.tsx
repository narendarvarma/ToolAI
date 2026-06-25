"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import AdWrapper from "./AdWrapper";

export default function NativeBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AdWrapper>
      <div id="container-0b70b5c822a4cf26d551af68c04a9c8c" />

      <Script
        id="adsterra-native-banner"
        src="https://pl29888573.effectivecpmnetwork.com/0b70b5c822a4cf26d551af68c04a9c8c/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </AdWrapper>
  );
}
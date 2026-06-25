"use client";

import { useEffect, useRef, useState } from "react";
import AdWrapper from "./AdWrapper";

export default function NativeBanner() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    containerRef.current.innerHTML = ""; // avoid duplicates on re-render/HMR

    const adDiv = document.createElement("div");
    adDiv.id = "container-0b70b5c822a4cf26d551af68c04a9c8c";
    containerRef.current.appendChild(adDiv);

    const script = document.createElement("script");
    script.src =
      "https://pl29888573.effectivecpmnetwork.com/0b70b5c822a4cf26d551af68c04a9c8c/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    containerRef.current.appendChild(script);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AdWrapper>
      <div ref={containerRef} />
    </AdWrapper>
  );
}
"use client";

import { useEffect, useState } from "react";
import AdWrapper from "./AdWrapper";

export default function NativeBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const script = document.createElement("script");
    script.src =
      "https://pl29888573.effectivecpmnetwork.com/0b70b5c822a4cf26d551af68c04a9c8c/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AdWrapper>
      <div id="container-0b70b5c822a4cf26d551af68c04a9c8c" />
    </AdWrapper>
  );
}
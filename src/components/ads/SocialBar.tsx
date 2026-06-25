"use client";

import { useEffect, useState } from "react";

export default function SocialBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const script = document.createElement("script");
    script.src =
      "https://pl29888574.effectivecpmnetwork.com/d3/39/08/d3390841dc3e359313014541f7f58247.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [mounted]);

  return null;
}
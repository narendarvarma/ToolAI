"use client";

import { useEffect } from "react";

export default function MonetagMultiTag() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://quge5.com/88/tag.min.js"]'
    );

    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://quge5.com/88/tag.min.js";
    script.async = true;
    script.setAttribute("data-zone", "253440");
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
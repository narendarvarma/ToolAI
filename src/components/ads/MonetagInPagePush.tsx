"use client";

import { useEffect } from "react";

export default function MonetagInPagePush() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[data-zone="11200306"]'
    );

    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;
    script.setAttribute("data-zone", "11200306");
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
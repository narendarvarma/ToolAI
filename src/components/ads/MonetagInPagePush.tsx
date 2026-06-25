"use client";

import { useEffect } from "react";

export default function MonetagInPagePush() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;
    script.setAttribute("data-zone", "11200306");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
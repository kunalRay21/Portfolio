"use client";

import { useEffect } from "react";
import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import Background from "./Background";
import Navbar from "./Navbar/Navbar";

export default function GlobalClient() {
  useEffect(() => {
    // Always scroll to top on page load/refresh
    window.scrollTo(0, 0);
    // Prevent browser from restoring scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <Loader />
      <Background />
      <Navbar />
    </>
  );
}

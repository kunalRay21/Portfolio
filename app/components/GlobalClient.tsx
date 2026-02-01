"use client";

import { useEffect } from "react";
import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import Background from "./Background";
import Navbar from "./Navbar/Navbar";
import ResumeModal from "./ResumeModal";
import { useResumeModal } from "../contexts/ResumeModalContext";

export default function GlobalClient() {
  const { isOpen, closeResume } = useResumeModal();

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
      <ResumeModal isOpen={isOpen} onClose={closeResume} />
    </>
  );
}

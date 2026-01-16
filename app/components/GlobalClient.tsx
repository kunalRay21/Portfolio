"use client";

import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import Background from "./Background";
import Navbar from "./Navbar/Navbar";

export default function GlobalClient() {
  return (
    <>
      <CustomCursor />
      <Loader />
      <Background />
      <Navbar />
    </>
  );
}

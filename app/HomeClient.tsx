"use client";

import { useEffect, useState } from "react";
import ClipTransition from "./components/Transitions/ClipTransition";
import ScrollIndicator from "./components/ScrollIndicator";

export default function HomeClient() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const reveal = setTimeout(() => {
      setHeroVisible(true);
    }, 1500);

    return () => {
      clearTimeout(reveal);
    };
  }, []);

  return (
    <>
      <ClipTransition />
      <ScrollIndicator isVisible={heroVisible} />
    </>
  );
}

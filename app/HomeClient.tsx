"use client";

import { useState } from "react";
import ClipTransition from "./components/Transitions/ClipTransition";
import ScrollIndicator from "./components/ScrollIndicator";

export default function HomeClient() {
  const [transitionComplete, setTransitionComplete] = useState(false);

  return (
    <>
      <ClipTransition onComplete={() => setTransitionComplete(true)} />
      {transitionComplete && <ScrollIndicator isVisible={true} />}
    </>
  );
}

import React from "react";
import { Slot } from "expo-router";

import BackgroundLayout from "@/components/BackgroundLayout";

export default function CabinLayout() {
  return (
    <BackgroundLayout>
      <Slot />
    </BackgroundLayout>
  );
}

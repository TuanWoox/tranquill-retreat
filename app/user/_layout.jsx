import React from "react";
import { Slot } from "expo-router";

import BackgroundLayout from "@/components/BackgroundLayout";

export default function UserLayout() {
  return (
    <BackgroundLayout>
      <Slot />
    </BackgroundLayout>
  );
}

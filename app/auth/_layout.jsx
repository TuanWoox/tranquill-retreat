import React from "react";
import { Slot, Stack } from "expo-router";

import BackgroundLayout from "@/components/BackgroundLayout";

export default function AuthLayout() {
  return (
    <BackgroundLayout>
      <Slot />
    </BackgroundLayout>
  );
}

"use client";

import { Theme } from "@radix-ui/themes";
import React from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

function NextThemeProvider({ children }: Props) {
  return (
    <ThemeProvider attribute='class'>
      <Theme
        appearance='light'
        accentColor='teal'
        grayColor='slate'
        scaling='105%'>
        {children}
      </Theme>
    </ThemeProvider>
  );
}

export default NextThemeProvider;

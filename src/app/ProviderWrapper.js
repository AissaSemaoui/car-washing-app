"use client";

import { MantineProvider } from "@mantine/core";
import React from "react";

function ProviderWrapper({ children }) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        // withNormalizeCSS
        withCSSVariables
        theme={{
          /** Put your mantine theme override here */
          headings: {
            sizes: {
              h1: "4rem",
            },
          },
          radius: {
            xl: "1.5rem",
          },
          colorScheme: "light",
        }}
      >
        {children}
      </MantineProvider>
    </>
  );
}

export default ProviderWrapper;

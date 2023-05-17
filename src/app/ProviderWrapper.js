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
          primaryShade: 5,
          colorScheme: "light",
          colors: {
            blue: [
              "#E1F3FF",
              "#ADDFFF",
              "#7FCDFF",
              "#56BDFF",
              "#3BADFF",
              "#2A9DF4",
              "#0092FF",
              "#0083F4",
              "#0075D9",
              "#0068C1",
            ],
            gray: [
              "#F8F9FA",
              "#F1F3F5",
              "#E9ECEF",
              "#E1E1E1",
              "#CED4DA",
              "#ADB5BD",
              "#767676",
              "#5E6769",
              "#424242",
              "#212529",
            ],
          },
        }}>
        {children}
      </MantineProvider>
    </>
  );
}

export default ProviderWrapper;

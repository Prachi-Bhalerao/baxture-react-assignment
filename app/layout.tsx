import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript ,Container} from "@mantine/core";
import { theme } from "../theme";
import styles from "./layout.module.css"; 

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={styles.fullWidthBody}>
        <MantineProvider  theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}

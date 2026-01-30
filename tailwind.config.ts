import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cbtc: {
          blue: "#00629B",
          pink: "#E91E63",
          orange: "#F9A825",
          dark: "#004B76",
        },
      },
    },
  },
  plugins: [],
};
export default config;
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
        husi: {
          'dark': '#0A3D5C',
          'medium': '#1E5A7A',
          'light': '#6BB5D8',
          'accent': '#4A9CC5',
          'sky': '#87CEEB',
        },
        neutral: {
          'text': '#2C3E50',
          'gray': '#64748B',
          'light': '#F1F5F9',
        }
      },
    },
  },
  plugins: [],
};

export default config;
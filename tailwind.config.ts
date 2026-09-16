import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050506",
          900: "#050506",
          800: "#0a0a0d",
          700: "#101015",
          600: "#16161d",
        },
        chalk: {
          DEFAULT: "#f4f4f6",
          dim: "#9a9aa8",
          faint: "#5a5a68",
        },
        accent: {
          DEFAULT: "#5b6bff",
          bright: "#7c8bff",
          glow: "#3a4bff",
          cyan: "#38e8ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

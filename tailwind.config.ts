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
        coy: {
          pink: "#FF2E7E",
          pinkHover: "#E0206B",
          black: "#111111",
          cream: "#FAF8F5",
          lavender: "#EDE8FF",
          yellow: "#FEF08A",
          peach: "#FFE4E6",
          sky: "#E0F2FE",
          mint: "#DCFCE7",
        },
      },
      boxShadow: {
        hard: "4px 4px 0px #000000",
        "hard-sm": "2px 2px 0px #000000",
        "hard-lg": "6px 6px 0px #000000",
        "hard-pink": "4px 4px 0px #FF2E7E",
      },
      borderRadius: {
        coy: "28px",
      },
      keyframes: {
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
      },
      animation: {
        "pop-in": "popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        heartbeat: "heartbeat 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

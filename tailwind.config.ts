import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        "cyber-dark": "#0a0e27",
        "cyber-darker": "#050810",
        "cyber-accent": "#06b6d4",
        "cyber-accent-secondary": "#a855f7",
        "cyber-accent-tertiary": "#3b82f6",
        "cyber-card": "rgba(15, 23, 42, 0.4)",
        "cyber-card-lg": "rgba(15, 23, 42, 0.6)",
      },
      backgroundImage: {
        "gradient-radial-cyan": "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
        "gradient-radial-purple": "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        "gradient-radial-cyan-premium": "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 80%)",
        "gradient-radial-purple-premium": "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 80%)",
        "gradient-radial-blue-premium": "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 80%)",
        "gradient-radial-cyan-soft": "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
        "gradient-radial-purple-soft": "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
        "gradient-premium": "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #001428 100%)",
        "gradient-text": "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #a855f7 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.3)",
        "glow-cyan-lg": "0 0 60px rgba(6, 182, 212, 0.4)",
        "glow-purple": "0 0 30px rgba(168, 85, 247, 0.3)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(6, 182, 212, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-down": "slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(6, 182, 212, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
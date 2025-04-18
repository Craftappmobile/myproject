import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Додаємо нові кольори для зеленої палітри
        sage: {
          50: "#F0F5F0", // Дуже світлий зелений
          100: "#E0E8E0", // Світлий шалфей
          200: "#D0E0D0", // М'ятний
          300: "#C0D8C0", // Світлий зелений
          400: "#A8C8A8", // Сіро-зелений
          500: "#8AB68A", // Зелений середній
          600: "#6B8E6B", // Зелений мох
          700: "#5A7A5A", // Темний шалфей
          800: "#4A6A4A", // Темний зелений
          900: "#3A5A3A", // Глибокий зелений
        },
        olive: {
          100: "#E8F0D8", // Світлий оливковий
          200: "#D8E0C8", // Оливковий світлий
          300: "#C8D8B8", // Оливковий
          400: "#B8C8A8", // Оливковий середній
          500: "#A0B090", // Оливковий насичений
        },
        moss: {
          300: "#7A9A7A", // Світлий мох
          400: "#6B8E6B", // Мох
          500: "#5A7A5A", // Темний мох
          600: "#4A6A4A", // Глибокий мох
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

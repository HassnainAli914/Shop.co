/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      borderRadius: {
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 0 0% 3.9%))',
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 0 0% 3.9%))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
          foreground: 'hsl(var(--popover-foreground, 0 0% 3.9%))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary, 0 0% 9%))',
          foreground: 'hsl(var(--primary-foreground, 0 0% 98%))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 0 0% 96.1%))',
          foreground: 'hsl(var(--secondary-foreground, 0 0% 9%))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 0 0% 96.1%))',
          foreground: 'hsl(var(--muted-foreground, 0 0% 45.1%))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 0 0% 96.1%))',
          foreground: 'hsl(var(--accent-foreground, 0 0% 9%))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84.2% 60.2%))',
          foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))'
        },
        border: 'hsl(var(--border, 0 0% 89.8%))',
        input: 'hsl(var(--input, 0 0% 89.8%))',
        ring: 'hsl(var(--ring, 0 0% 3.9%))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [],
}

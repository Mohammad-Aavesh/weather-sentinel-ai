/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1526',
          900: '#0F2038',
          800: '#172E4E',
          700: '#204068',
          600: '#2D588D'
        },
        sentinel: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAE0FD',
          300: '#7DC5FC',
          400: '#38A4F7',
          500: '#0F87EE',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          borderLight: '#F1F5F9',
          text: '#0F172A',
          muted: '#64748B',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          critical: '#DC2626'
        }
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(37, 99, 235, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 2px 12px -2px rgba(37, 99, 235, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 24px -4px rgba(37, 99, 235, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'blue-enib': '#91D1DD',
        'rose-enib': {
          DEFAULT: '#EA5F7E',
          light: '#E88097'
        },
        'orange-enib': {
          DEFAULT: '#EA8A00',
          light: '#FFA11C'
        },
        'gray-enib': {
          DEFAULT: '#EDEDED',
          1: '#F7F4F1'
        },
        'green-enib': {
          DEFAULT: '#5FBF64'
        }
      },
      spacing: {
        112: '28rem',
        128: '31rem',
        140: '40rem'
      }
    }
  },
  plugins: []
}

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      gridColumn: ['first'],
      borderWidth: ['last'],
    },
  },
}

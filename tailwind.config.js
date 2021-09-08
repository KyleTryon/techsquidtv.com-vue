const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  theme: {
    colors: {
      gray: colors.gray,
      purple: colors.violet,
      white: colors.white,
      black: colors.black,
    },
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

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
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
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

import colors from '../config/colors'

const buttonStyles = {
  default: {
    backgroundColor: colors.white,
    textColor: colors.red,
    hoverBackgroundColor: colors.red,
    borderColor: colors.red,
    hoverTextColor: colors.white,
    border: '1px',
  },
  red: {
    backgroundColor: colors.red,
    textColor: colors.white,
    hoverBackgroundColor: colors.darkRed,
    borderColor: colors.red,
    hoverTextColor: colors.white,
    border: 'none',
  },
  grey: {
    backgroundColor: colors.lightGrey,
    textColor: colors.black,
    hoverBackgroundColor: colors.greyGreen,
    borderColor: colors.red,
    hoverTextColor: colors.black,
    border: 'none',
  },
  green: {
    backgroundColor: colors.mediumGreen,
    textColor: colors.white,
    hoverBackgroundColor: colors.darkGreen,
    borderColor: colors.red,
    hoverTextColor: colors.white,
    border: 'none',
  },
}

export { buttonStyles }

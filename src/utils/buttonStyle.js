import { buttonStyles } from '../constants/styleConfig'

const buttonStyle = (size, color) => {
  let classes = ''
  let style = buttonStyles[color]

  if (size === 'small') classes += 'button-small '
  if (size === 'large') classes += 'button-big '

  return { classes, style }
}

export { buttonStyle }

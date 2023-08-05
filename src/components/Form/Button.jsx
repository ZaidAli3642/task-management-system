import { useMemo } from 'react'

const Button = ({ title, color = 'green', size = 'small' }) => {
  const classes = useMemo(() => {
    let classes = ''
    if (size === 'small') classes += 'button-small '
    if (size === 'large') classes += 'button-big '
    if (color === 'default') classes += 'button-default '
    if (color === 'red') classes += 'button-red '
    if (color === 'grey') classes += 'button-grey '
    if (color === 'green') classes += 'button-green '

    return classes
  }, [])

  console.log(classes)

  return <button className={`button ${classes}`}>{title}</button>
}

export default Button

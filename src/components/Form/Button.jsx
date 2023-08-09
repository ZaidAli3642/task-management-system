import { useMemo } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

import { buttonStyle } from '../../utils/buttonStyle'

const Button = ({ title, color = 'green', size = 'small', type, onClick, ...props }) => {
  const { classes, style } = useMemo(() => buttonStyle(size, color), [])

  return (
    <ChakraButton
      {...props}
      onClick={onClick}
      type={type}
      backgroundColor={style.backgroundColor}
      textColor={style.textColor}
      borderColor={style.borderColor}
      border={style.border}
      _hover={{
        backgroundColor: style.hoverBackgroundColor,
        color: style.hoverTextColor,
      }}
      className={`button ${classes}`}
    >
      {title}
    </ChakraButton>
  )
}

export default Button

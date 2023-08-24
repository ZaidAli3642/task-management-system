import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'

import ROUTES from './routes'
import colors from '../../config/colors'

const NavItems = () => {
  const location = useLocation()

  const navActiveColor = path => {
    const navItems = location.pathname.split('/')
    return path?.includes(navItems[1])
  }

  useEffect(() => {
    navActiveColor()
  }, [])

  return (
    <Stack direction={'row'}>
      {ROUTES.map(navItem => (
        <Box key={navItem.id}>
          <Box py={2} px='20px' fontSize={16} fontWeight={500} textTransform={'none'} letterSpacing={'normal'} color={navActiveColor(navItem.path) ? colors.mediumGreen : colors.black}>
            <Link to={navItem.path}>{navItem.label}</Link>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

export default NavItems

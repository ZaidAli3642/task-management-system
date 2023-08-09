import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'

import ROUTES from './routes'
import colors from '../../config/colors'

const NavItems = () => {
  const [routes, setRoutes] = useState(ROUTES)

  const changeActiveColor = id => {
    const changedRoutes = routes.map(route => (route.id === id ? { ...route, active: true } : { ...route, active: false }))
    setRoutes(changedRoutes)
  }

  return (
    <Stack direction={'row'} spacing={4}>
      {routes.map(navItem => (
        <Box key={navItem.id}>
          <Box p={2} fontSize={16} fontWeight={500} textTransform={'none'} letterSpacing={'normal'} color={navItem.active ? colors.mediumGreen : colors.black}>
            <Link onClick={() => changeActiveColor(navItem.id)} to={navItem.path}>
              {navItem.label}
            </Link>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

export default NavItems

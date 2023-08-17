import { useState ,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'

import ROUTES from './routes'
import colors from '../../config/colors'

const NavItems = () => {
  const [routes, setRoutes] = useState(ROUTES)
  const location =useLocation();

  const changeActiveColor = id => {
    const changedRoutes = routes.map(route => (route.id === id ? { ...route, active: true } : { ...route, active: false }))
    setRoutes(changedRoutes)
     
  }

  return (
    <Stack direction={'row'}>
      {routes.map(navItem => (
        <Box key={navItem.id}>
          <Box py={2} px='20px' fontSize={16} fontWeight={500} textTransform={'none'} letterSpacing={'normal'} color={navItem.path === location.pathname ? colors.mediumGreen : colors.black}>
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

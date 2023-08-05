import { Box, Image, Icon as ChakraIcon } from '@chakra-ui/react'

const Icon = ({ image, hoveredImage }) => {
  return (
    <Box className='icon-container'>
      <Image src={image} className={hoveredImage && 'icon'} />
      {hoveredImage && <Image src={hoveredImage} className='icon' />}
    </Box>
  )
}

export default Icon

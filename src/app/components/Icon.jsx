import { Box, Image } from '@chakra-ui/react'

const Icon = ({ image, hoveredImage, ...props }) => {
  return (
    <Box {...props} className='icon-container'>
      <Image src={image} className={hoveredImage && 'icon'} />
      {hoveredImage && <Image src={hoveredImage} className='icon' />}
    </Box>
  )
}

export default Icon

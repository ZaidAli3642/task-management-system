import { Box, Image } from '@chakra-ui/react'

const Icon = ({ image, hoveredImage, onClick, isRotated, imageWidth, imageHeight, ...props }) => {
  let className = 'icon-container'
  if (isRotated) className += ' icon-container-rotated'

  return (
    <Box onClick={onClick} {...props} className={className}>
      <Image src={image} width={imageWidth} height={imageHeight} className={hoveredImage && 'icon'} />
      {hoveredImage && <Image src={hoveredImage} className='icon' />}
    </Box>
  )
}

export default Icon

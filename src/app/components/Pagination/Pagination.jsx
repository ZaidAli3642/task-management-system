import { Box, Text } from '@chakra-ui/react'
import Icon from '../Icon'
import assets from '../../assets/assets'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ onChangePerPage, onChangePage, pageCount, perPage, pageNo }) => {
  const [openPerPage, setOpenPerPage] = useState(false)

  return (
    <Box w={'100%'} marginY={'10px'} display={'flex'} justifyContent={'space-between'} paddingX={'10px'} alignItems={'center'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text color={'#7E919F'} fontWeight={400} fontSize={'12px'}>
          Companies per page:
        </Text>

        <Box
          marginLeft={'10px'}
          onClick={() => {
            setOpenPerPage(!openPerPage)
          }}
          position={'relative'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text cursor={'pointer'} color={'#484848'} fontSize={'14px'} fontWeight={400}>
            {perPage}
          </Text>
          <Icon cursor={'pointer'} image={assets.icons.chevronDown} w='16px' h='16px' display={'flex'} justifyContent={'center'} alignItems={'center'} />
          {openPerPage && (
            <Box padding={'5px'} paddingX={'10px'} borderRadius={'5px'} boxShadow={'0px 5px 25px 0px rgba(4, 38, 28, 0.05)'} background={'white'} top={'20px'} left={0} position={'absolute'}>
              {[10, 20, 30, 40, 50].map((perPage, index) => (
                <Text onClick={() => onChangePerPage(perPage)} cursor={'pointer'} key={index} fontSize={'14px'} fontWeight={400}>
                  {perPage}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <ReactPaginate forcePage={pageNo} onPageChange={onChangePage} breakLabel='...' nextLabel='>' disabledClassName='disabled-prev-next' nextClassName='next-classname' pageClassName='page-classname' activeClassName='active-classname' pageRangeDisplayed={5} className='pagination-container' pageCount={pageCount} previousLabel='<' renderOnZeroPageCount={null} />
    </Box>
  )
}

export default Pagination

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

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <ReactPaginate
          forcePage={pageNo}
          onPageChange={onChangePage}
          breakClassName='break-classname'
          breakLabel='...'
          nextLabel={
            <Icon
              onClick={() => {
                pageNo + 1 !== pageCount && onChangePage({ selected: pageNo + 1 })
              }}
              marginLeft='10px'
              cursor='pointer'
              image={pageNo + 1 === pageCount ? assets.icons.chevronRightDisabled : assets.icons.chevronRight}
              w='10px'
              h='6px'
              marginBottom='1px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            />
          }
          disabledClassName='disabled-prev-next'
          nextClassName='next-classname'
          pageClassName='page-classname'
          activeClassName='active-classname'
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          breakLinkClassName='break-classname'
          className='pagination-container'
          nextLinkClassName='arrows'
          previousLabel={
            <Icon
              onClick={() => {
                pageNo > 0 && onChangePage({ selected: pageNo - 1 })
              }}
              cursor='pointer'
              marginRight='10px'
              image={pageNo === 0 ? assets.icons.chevronLeftDisabled : assets.icons.chevronLeft}
              w='10px'
              h='6px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            />
          }
          renderOnZeroPageCount={null}
        />
      </Box>
    </Box>
  )
}

export default Pagination

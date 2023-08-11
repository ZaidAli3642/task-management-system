import React from 'react'
import data from '../../../components/MOCK_DATA.json'
import Icon from '../../../components/Icon'
import logo from '../../../assets/icons/Vector.svg'
import { useState } from 'react'
import {
  Table,
  
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'


function Customer() {
  const [isVisible, setIsVisible] = useState(false);
  function over(e) {
    setIsVisible(true);
  }
  function out(e) {
    setIsVisible(false);
  }
  const columns = [
    {
      id: 1,
      title: 'Name',
    },
    {
      id: 2,
      title: 'Unsolved',
    },
    {
      id: 3,
      title: '8 May - 21 May',
      subTitle: 'Week 19',
    },
    {
      id: 4,
      title: '8 May - 21 May',
      subTitle: 'Week 19',
    },
    {
      id: 5,
      title: '8 May - 21 May',
      subTitle: 'Week 19',
    },
    {
      id: 6,
      title: '8 May - 21 May',
      subTitle: 'Week 19',
    },
    {
      id: 7,
      title: '8 May - 21 May',
      subTitle: 'Week 19',
    },
  ]

  return (
    <div>
      <Table
        bg={'white'}
        borderRadius='10px'
        w='1300px'
        mt='24px'
        h='570px'
        ms='24px '
      >
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                style={{
                  color: column.id === 3 ? '#1BA076' : null,
                  borderBottom:
                    column.id === 3
                      ? '1px solid green'
                      : column.id === 2
                      ? '1px solid red'
                      : 'none',
                }}
                key={column.id}
              >
                <Tr
                  style={{
                    color:
                      column.id === 3
                        ? '#1BA076'
                        : column.title === 'Unsolved'
                        ? '#FB4364'
                        : 'black',
                  }}
                >
                  {column.title}
                </Tr>
                <Tr fontWeight={500} color={'black'}  style={{
                color: column.id === 3 ? '#1BA076' : null,}}>
                  {column.subTitle}
                </Tr>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((val, key) => {
            return (
              <Tr key={key}>
                <Td fontWeight={600} fontSize='14px' >
        
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  {val.name }
                  <Box>
                   <Icon  image={logo} />
                   </Box>
                   </Box>
                </Td>
                <Td bg={'#FCE6EA80'} fontWeight={400}>
                  {val.unsolved}
                </Td>
                <Td bg={'#CFF0E680'} fontWeight={400} color={'#1BA076'}>
                  {val.week1}
                </Td>
                <Td fontWeight={400}>{val.week2}</Td>
                <Td fontWeight={400}>{val.week3}</Td>
                <Td fontWeight={400}>{val.week4}</Td>
                <Td fontWeight={400}>{val.week5}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
     
    </div>
  )
}

export default Customer

import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import colors from '../config/colors'
import { useRef, useState } from 'react'
import assets from '../assets/assets'
import Icon from './Icon'
import CheckBox from './Form/Checkbox'
import moment from 'moment'

const Filter = ({ onClearKeyValues, selectYear, selectedYear, data, onSelectItem, menuButtonMarginX = '6px', label, dropDownContainerWidth = '270px', optionKey, filterCheck }) => {
  const [isOpen, setIsOpen] = useState(false)
  const weekNo = useRef(moment().week())
  const [previousSelectedYear, setPreviousSelectedYear] = useState(moment().year())
  const [previousDates, setPreviousDates] = useState(data)
  const [currentYear, setCurrentYear] = useState(moment().year())
  const listRef = useRef(null)

  const setLabel = (isSelectedYear = false) => {
    let labelData
    if (!isSelectedYear) {
      labelData = data?.filter(data => {
        if (filterCheck?.includes(data.id)) {
          return data
        }
      })
    } else {
      let filterData = currentYear === selectedYear ? data : previousDates
      labelData = filterData?.filter(data => {
        if (filterCheck?.includes(data.id)) {
          return data
        }
      })
    }

    if (!labelData?.length) return null

    if (isSelectedYear) {
      let firstDateItem = labelData.find(data => data.week === moment().week())
      if (!firstDateItem) firstDateItem = labelData[0]

      const formattedDateOne = moment(`${firstDateItem.weekFirstDate} ${currentYear}`, 'MMM D YYYY').format("D MMM 'YY")
      const formattedDateTwo = moment(`${firstDateItem.weekLastDate} ${currentYear}`, 'MMM D YYYY').format("D MMM 'YY")

      const formattedDate = `${formattedDateOne} - ${formattedDateTwo}`
      labelData[0] = { ...firstDateItem, description: formattedDate }
      weekNo.current = labelData[0].week
    }

    return labelData?.length > 1 ? `${labelData[0][optionKey]} +${labelData.length - 1}` : `${labelData[0][optionKey]}`
  }

  const formatSelectedWeekText = (data, labelData) => {
    if (labelData)
      return (
        <Box marginTop={'1px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Text color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
            {`Week ${weekNo.current}`}&nbsp;
          </Text>
          <Text paddingBottom={'6.5px'} color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
            {`.`}&nbsp;
          </Text>
          <Text color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
            {labelData}
          </Text>
        </Box>
      )

    return (
      <Box lineHeight={'16.41px'} marginTop={'1.5px'} marginX={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'14px'} fontWeight={600}>
          {`Week ${data.week}`}&nbsp;
        </Text>
        <Text paddingBottom={'6.5px'} fontSize={'14px'} fontWeight={600}>
          {`.`}&nbsp;
        </Text>
        <Text fontSize={'14px'} fontWeight={400}>{`${data.weekFirstDate} to ${data.weekLastDate}, ${selectedYear}`}</Text>
      </Box>
    )
  }

  return (
    <>
      <Menu
        isOpen={isOpen}
        closeOnSelect={false}
        onClose={() => {
          setIsOpen(false)
          if (selectYear && currentYear !== selectedYear) {
            selectYear(currentYear)
          }
        }}
      >
        <MenuButton
          marginX={menuButtonMarginX}
          onClick={() => {
            setIsOpen(!isOpen)

            if (listRef.current) {
              setTimeout(() => {
                listRef.current?.scrollIntoView({})
                window.scrollTo(0, 0)
              }, 110)
            }
          }}
        >
          <Flex alignItems={'center'}>
            {selectedYear ? (
              formatSelectedWeekText({}, setLabel(true))
            ) : (
              <Text color={colors.black} fontSize={'14px'} textColor={colors.darkGreen} fontWeight={600}>
                {setLabel() || label}
              </Text>
            )}
            <Icon marginLeft='10px' w='fit-content' h='fit-content' display='flex' justifyContent='center' alignItems='center' image={isOpen ? assets.icons.chevronUpGreen : assets.icons.chevronDownGreen} />
          </Flex>
        </MenuButton>
        <MenuList zIndex={99} position={'absolute'} top={'5px'} left={'-10px'} background={'white'} minW={dropDownContainerWidth} padding={'10px'} paddingLeft={0} margin={0}>
          {selectedYear && (
            <Box paddingY={'5px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Icon
                onClick={() => {
                  const lastYear = +selectedYear - 1
                  selectYear(lastYear)
                  if (previousSelectedYear === selectedYear) setPreviousSelectedYear(selectedYear)
                }}
                image={assets.icons.chevronLeftGreen}
                display='flex'
                justifyContent='center'
                cursor='pointer'
                alignItems='center'
              />
              <Text fontWeight={600} fontSize={'14px'} color={colors.black}>
                {selectedYear}
              </Text>
              <Icon
                onClick={() => {
                  const nextYear = +selectedYear + 1
                  selectYear(nextYear)
                  if (previousSelectedYear === selectedYear) setPreviousSelectedYear(selectedYear)
                }}
                image={assets.icons.chevronRightGreen}
                display='flex'
                justifyContent='center'
                cursor='pointer'
                alignItems='center'
              />
            </Box>
          )}

          <MenuList
            css={{
              '&::-webkit-scrollbar': {
                width: '7px',
                borderRadius: '10px',
                background: colors.borderGrey,
              },
              '&::-webkit-scrollbar-track': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: colors.darkGreen,
                borderRadius: '10px',
              },
            }}
            boxShadow={'0px 0px 0px 0px '}
            border={0}
            outline={0}
            background={'transparent'}
            padding={'0'}
            minW={'auto'}
            maxH={'250px'}
            overflowY={'auto'}
          >
            {data.map((d, index) => (
              <MenuItem ref={d.week === moment().week() ? listRef : null} key={index} paddingY={'5px'} marginY={'5px'} fontSize={'14px'} fontWeight={400} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} background={'transparent'}>
                <CheckBox
                  onChange={checked => {
                    if (selectYear) {
                      let isPreviousRemove = false
                      if (filterCheck.length === 1 && checked === false) return
                      if (selectedYear !== previousSelectedYear) {
                        isPreviousRemove = true
                      }
                      setCurrentYear(selectedYear)
                      setPreviousSelectedYear(selectedYear)
                      setPreviousDates(data)
                      onSelectItem(checked, d, isPreviousRemove)
                    } else {
                      onSelectItem(checked, d)
                    }
                  }}
                  checked={selectYear ? previousSelectedYear === selectedYear && filterCheck?.includes(d.id) : filterCheck?.includes(d.id)}
                  isChecked={true}
                />
                {selectYear ? (
                  formatSelectedWeekText(d)
                ) : (
                  <Text marginX={'5px'} marginTop={'1px'} lineHeight={0} fontSize={'14px'} fontWeight={400}>
                    {d[optionKey]}
                  </Text>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </MenuList>
      </Menu>
    </>
  )
}

export default Filter

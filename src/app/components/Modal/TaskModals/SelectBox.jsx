import React, { useState } from 'react';
import { Box, Button, Collapse,Flex,Text } from '@chakra-ui/react';
import { ChevronDownIcon,ChevronUpIcon } from '@chakra-ui/icons';
import colors from '../../../config/colors';

const SelectBox = ({ label,options=[],  onSelect,width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <Box display="inline-block">
        <Button
            w={width}
            h='50px'
            onClick={toggleOptions}
            variant="outline"
            size="sm"
            fontSize={'16px'}
            fontWeight={400}
            color={selectedOption ? 'black' : '#BFD7CF;'}
            
            
        >
       <Flex justifyContent="space-between" alignItems="center" width="100%" fontWeight={400} fontSize='16px'>
          <Text color={selectedOption ? 'black' : '#bfd7cf'}>
            {selectedOption !== null ? selectedOption : label}
          </Text>
          {isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon color='black' boxSize={6} />}
        </Flex>
      </Button>
      <Collapse in={isOpen}>
        <Box  mt={2}>
          {options.map((option) => (
            <Box
              
              key={option}
              p={2}
              _hover={{ bg: 'gray.100',color:'black' , cursor: 'pointer' }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default SelectBox;

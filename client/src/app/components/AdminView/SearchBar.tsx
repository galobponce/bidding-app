import { FC, KeyboardEvent } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';

import { FilterComponentIterface } from './FilterComponentInterface';


export const SearchBar: FC<FilterComponentIterface> = ({ value, handleFiltering, onInputChange }) => {


  // If user presses 'enter' key while typing on input, filters
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFiltering();
    }
  }


  return (
    <InputGroup w={{ base: 'xs', md: 'md', lg: 'lg' }}>
      <Input
        type='text'
        name='search'
        borderRadius='2xl'
        placeholder='Search by title or description'
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onInputChange}
      />
      <InputRightElement>
        <IconButton
          borderRadius='2xl'
          variant='solid'
          colorScheme='teal'
          aria-label='Search'
          icon={<SearchIcon />}
          onClick={handleFiltering}
        />
      </InputRightElement>
    </InputGroup>
  );
}
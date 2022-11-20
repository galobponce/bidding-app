import { FC, KeyboardEvent } from 'react';
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';

import { setSearchFilter } from '../../../store/item';
import { useForm, useGlobalDispatch } from '../../../hooks';


export const SearchBar: FC = () => {


  const dispatch = useGlobalDispatch();


  const { values, onInputChange, clearValues } = useForm({
    search: '',
  });
  const { search } = values;


  // If user presses 'enter' key while typing on input, sets the search filter
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }


  const handleClear = () => {
    clearValues();
    dispatch(setSearchFilter({ search: '' }));
  }


  const handleSearch = () => {
    dispatch(setSearchFilter({ search }));
  }


  return (
    <InputGroup w={{ base: 'xs', md: 'md', lg: 'lg' }}>
      <Input
        type='text'
        name='search'
        borderRadius='2xl'
        placeholder='Search by title or description'
        value={search}
        onKeyDown={handleKeyDown}
        onChange={onInputChange}
      />
      <InputRightElement>
      <IconButton
          variant='unstyled'
          colorScheme='gray'
          aria-label='Clear'
          icon={<SmallCloseIcon />}
          onClick={handleClear}
        />
        <IconButton
          mr='2rem'
          borderRadius='2xl'
          variant='solid'
          colorScheme='teal'
          aria-label='Search'
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
}
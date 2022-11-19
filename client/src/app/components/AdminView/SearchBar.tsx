import { FC } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';


export const SearchBar: FC = () => {
  return (
    <InputGroup w={{ base: 'xs', md: 'md', lg: 'lg' }}>
      <Input type='text' placeholder='Search by title or description' />
      <InputRightElement>
        <IconButton
          variant='ghost'
          aria-label='Search'
          icon={<SearchIcon />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
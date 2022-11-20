import { FC } from 'react';
import { Button, Flex, IconButton, Stack } from '@chakra-ui/react';

import { useGlobalDispatch, useGlobalSelector } from '../../hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { startLoadingItems } from '../../store/item';


export const Paginator: FC = () => {

  const dispatch = useGlobalDispatch();
  const { page, pages, filters } = useGlobalSelector(state => state.item);


  const handlePreviousPage = () => {
    // If its possible to go to previous page
    if (page - 1 >= 1) {
      dispatch(startLoadingItems(page - 1, filters))
    }
  };


  const handleNextPage = () => {
    // If its possible to go to next page
    if (page + 1 <= pages) {
      dispatch(startLoadingItems(page + 1, filters))
    }
  };


  const goToSpecificPage = (pageNumber: number) => {
    // If desired page is different from current one
    if (pageNumber !== page) {
      dispatch(startLoadingItems(pageNumber, filters))
    }
  };


  return (
    <Flex mb='2rem' w='full' alignItems='center' justifyContent='center'>
      <Stack direction='row'>
        <IconButton size='xs' aria-label='Previous Page' icon={<ChevronLeftIcon fontSize='x-small' />} onClick={handlePreviousPage} />
        {
          // Create array of {pages} lenght and fill it with numbers from 1 to {pages}
          Array.from({ length: pages }, (_, i) => i + 1).map(number => {
            return (
              <Button size='xs' onClick={() => goToSpecificPage(number)} backgroundColor={number === page ? 'teal.400' : 'initial'}>
                {number}
              </Button>
            );
          })
        }
        <IconButton size='xs' aria-label='Next Page' icon={<ChevronRightIcon fontSize='x-small' />} onClick={handleNextPage} />
      </Stack>
    </Flex>
  );
};
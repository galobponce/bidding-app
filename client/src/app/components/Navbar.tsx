import { FC } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Center, Text, useColorMode, HStack, IconButton, useColorModeValue, Tooltip } from '@chakra-ui/react';

import { appRoutes } from '../router';
import { NewItemButton } from './itemDetail';
import { startLogout } from '../../store/auth';
import { useGlobalDispatch } from '../../hooks';
import { changeHtmlBackgroundColor } from '../utils';


export const Navbar: FC = () => {

  const navigate = useNavigate();
  const dispatch = useGlobalDispatch()
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const { colorMode, toggleColorMode } = useColorMode();


  const onClickToggleColorMode = () => {
    changeHtmlBackgroundColor(colorMode);
    toggleColorMode();
  };


  return (
    <Center zIndex='sticky' position='sticky' top='0' w='100%' h='100%' bg='white' _dark={{ bg: 'gray.800' }} px={['3', '6']} py='1' borderBottom='2px' borderColor='transparent' boxShadow='lg' justifyContent='space-between'>
      <Center>
        <Text
          fontWeight='semibold'
          color={colorMode === 'dark' ? 'teal.400' : 'teal.500'}
          textAlign='center'
          fontSize='3xl'
          onClick={() => navigate(appRoutes.HOME)}
        >
          Bidding App
        </Text>
      </Center>
      <HStack spacing='2'>
        <NewItemButton />
        <Tooltip label="Toggle Color Mode"  aria-label='color mode tooltip'>
          <IconButton
            fontSize='xl'
            aria-label='Toggle color mode'
            variant='ghost'
            onClick={onClickToggleColorMode}
            icon={<SwitchIcon />}
          />
        </Tooltip>
        <Tooltip label="Log Out"  aria-label='log out tooltip'>
          <IconButton
            fontSize='xl'
            aria-label='Lot Out'
            variant='ghost'
            color='red'
            _dark={{ color: 'red.500' }}
            onClick={() => dispatch(startLogout())}
            icon={<MdLogout />}
          />
        </Tooltip>
      </HStack>
    </Center>
  );
};

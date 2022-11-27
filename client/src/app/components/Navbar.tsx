import { FC } from 'react';
import { MdLogout } from 'react-icons/md';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoSettings, IoSettingsOutline } from 'react-icons/io5';
import { Center, Text, useColorMode, HStack, IconButton, Tooltip } from '@chakra-ui/react';

import { appRoutes } from '../router';
import { NewItemButton } from './itemDetail';
import { startLogout } from '../../store/auth';
import { useGlobalDispatch } from '../../hooks';


export const Navbar: FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useGlobalDispatch()
  const { colorMode } = useColorMode();
  const HomeIcon = location.pathname === appRoutes.HOME ? AiFillHome : AiOutlineHome;
  const SettingsIcon = location.pathname === appRoutes.SETTINGS ? IoSettings : IoSettingsOutline;


  return (
    <Center
      zIndex='sticky'
      position='sticky'
      top='0'
      w='100%'
      h='100%'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      px={['3', '6']}
      py='1'
      borderBottom='2px'
      borderColor='transparent'
      boxShadow='lg'
      justifyContent='space-between'
    >
      <Center>
        <Text
          fontWeight='semibold'
          color={colorMode === 'dark' ? 'teal.400' : 'teal.500'}
          textAlign='center'
          fontSize='2xl'
          onClick={() => navigate(appRoutes.HOME)}
        >
          Bidding App
        </Text>
      </Center>
      <HStack spacing='2'>
        <NewItemButton />
        <Tooltip label="Home" aria-label='home tooltip'>
          <IconButton
            fontSize='2xl'
            aria-label='Home'
            variant='ghost'
            onClick={() => navigate(appRoutes.HOME)}
            icon={<HomeIcon />}
          />
        </Tooltip>
        <Tooltip label="Settings" aria-label='settings tooltip'>
          <IconButton
            fontSize='2xl'
            aria-label='Settings'
            variant='ghost'
            onClick={() => navigate(appRoutes.SETTINGS)}
            icon={<SettingsIcon />}
          />
        </Tooltip>
        <Tooltip label="Log Out" aria-label='log out tooltip'>
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

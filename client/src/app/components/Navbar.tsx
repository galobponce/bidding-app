import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Center, Text, useColorMode, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';

import { appRoutes } from '../router';
import { changeHtmlBackgroundColor } from '../utils';


export const Navbar: FC = () => {

  const navigate = useNavigate();
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
        <IconButton
          fontSize='xl'
          aria-label='Toggle color mode'
          variant='ghost'
          onClick={onClickToggleColorMode}
          icon={<SwitchIcon />}
        />
      </HStack>
    </Center>
  );
};
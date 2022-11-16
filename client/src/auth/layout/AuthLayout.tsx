import { FC } from 'react';
import { Center, Grid, Text, useColorMode, Image } from '@chakra-ui/react';


interface IAuthLayout  {
  children: JSX.Element | JSX.Element[];
  showBrand?: boolean;
}


export const AuthLayout: FC<IAuthLayout> = ({ children, showBrand = true }) => {
  return (
    <Center flexDirection='column' h='80vh'>
      {showBrand ? <Brand /> : null}
      <Grid w='30vw' p='3' mb='7'>
        {children}
      </Grid>
    </Center>
  );
};


const Brand: FC = () => {

  const { colorMode } = useColorMode();

  return (
    <Grid mb='9'>
      <Center>
        <Text fontWeight='semibold' color={colorMode === 'dark' ? 'teal.400' : 'teal.500'} textAlign='center' fontSize='6xl'>Bidding App</Text>
      </Center>
    </Grid>
  );
};
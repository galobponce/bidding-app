import { FC } from 'react';
import { Center, Grid, Text, useColorMode } from '@chakra-ui/react';


export const AuthLayout: FC<{ children: JSX.Element | JSX.Element[]; }> = ({ children }) => {

  
  const { colorMode } = useColorMode();


  return (
    <Center flexDirection='column' h='80vh'>

      <Grid mb='9'>
        <Center>
          <Text fontWeight='semibold' color={colorMode === 'dark' ? 'teal.400' : 'teal.500'} textAlign='center' fontSize='6xl'>Bidding App</Text>
        </Center>
      </Grid>
      
      <Grid p='3'>
        {children}
      </Grid>
    </Center>
  );
};
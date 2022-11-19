import { FC } from 'react';
import { Center, Text, Button } from '@chakra-ui/react';


export const RepositoryLink: FC = () => {
  return (
    <Center w='100%' h='100%' bgGradient='linear(to-r, cyan.700, purple.500)' py='2'>
      <Text color='white' textAlign='center' fontSize='md'>Check out the repository</Text>
      <Button
        onClick={() => window.open('https://github.com/galobponce/bidding-app', '_blank').focus()}
        ml='3'
      >
        Click here
      </Button>
    </Center>
  );
};

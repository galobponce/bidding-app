import { FC, FormEvent } from 'react';
import { Input, Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout';


export const Login: FC = () => {
  
  const { values, onInputChange } = useForm({
    username: ''
  });


  const { username } = values;


  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <AuthLayout>
      <form onSubmit={onFormSubmit}>
      <FormControl>
        <Input type='text' name='username' autoComplete='on' placeholder='Type your username' value={username} onChange={onInputChange} required />
        <FormHelperText>Try with admin1 or user1</FormHelperText>
      </FormControl>
        <Button w='100%' mt='4' mb='2' colorScheme='teal' type='submit'>Log In</Button>
      </form>
    </AuthLayout>
  );
};

import { FC, FormEvent } from 'react';
import { Input, Button, FormControl, FormHelperText } from '@chakra-ui/react';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout';
import { startLogIn } from '../../store/auth';
import { useGlobalDispatch } from '../../hooks';


export const Login: FC = () => {


  const dispatch = useGlobalDispatch();

  
  const { values, onInputChange } = useForm({
    username: ''
  });

  const { username } = values;


  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(startLogIn(username));
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

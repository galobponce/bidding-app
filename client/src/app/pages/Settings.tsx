import { FC, useEffect, useState } from 'react';
import { Text, Flex, Button, useColorMode, Center, Divider, FormControl, FormLabel, Input, FormHelperText, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Tooltip } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

import { AppLayout } from '../layout';
import { changeHtmlBackgroundColor } from '../utils';
import { startGetUserSettings, startSaveUserSettings } from '../../store/userSettings';
import { useForm, useGlobalDispatch, useGlobalSelector } from '../../hooks';


export const Settings: FC = () => {

  const dispatch = useGlobalDispatch();
  const [canSave, setCanSave] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { uid, isAdmin } = useGlobalSelector(state => state.auth);
  const settingsState = useGlobalSelector(state => state.userSettings);
  const { isLoading } = settingsState;


  const { values, onInputChange, setValues, clearValues } = useForm({
    id: 0,
    auto_bid_alert: 0,
    auto_bid_max_amount: 0,
  });
  const { id, auto_bid_alert, auto_bid_max_amount } = values;


  useEffect(() => {
    dispatch(startGetUserSettings(Number(uid)));
  }, [])


  useEffect(() => {
    if (!settingsState) { clearValues(); return; }

    setValues({
      id: settingsState.id,
      auto_bid_alert: settingsState.auto_bid_alert,
      auto_bid_max_amount: settingsState.auto_bid_max_amount,
    });
  }, [settingsState])


  // Read changes of input values to determinate if the user settings has been modified or if it is valid
  // This is for disabling the save
  useEffect(() => {

    if (!auto_bid_max_amount) { setCanSave(false); return; }

    if (auto_bid_max_amount == settingsState.auto_bid_max_amount && auto_bid_alert == settingsState.auto_bid_alert) { setCanSave(false); return; }

    setCanSave(true);

  }, [auto_bid_max_amount, auto_bid_alert]);


  const onClickToggleColorMode = () => {
    changeHtmlBackgroundColor(colorMode);
    toggleColorMode();
  };


  const onClickSave = () => {
    dispatch(startSaveUserSettings({ id, auto_bid_alert, auto_bid_max_amount }));
  }


  return (
    <AppLayout>

      <Center flexDir='column' gap='5' mb='5'>
        <Text fontSize='3xl' fontWeight='bold'>Settings</Text>

        <Flex w='100%' gap='3' flexDir='column' justifyContent='space-between' p='5' borderRadius='lg' _dark={{ boxShadow: 'dark-lg' }} boxShadow='2xl'>
          <Text fontSize='xl' fontWeight='semibold'>General</Text>
          <Divider />
          <Center flexDir='row' gap='2'>
            <Text fontSize='md' fontWeight='semibold'>Color Mode</Text>
            <Button onClick={onClickToggleColorMode}>Toggle</Button>
          </Center>
        </Flex>

        {
          !isAdmin && (
            <Flex
              w='100%'
              gap='3'
              flexDir='column'
              justifyContent='space-between'
              p='5'
              borderRadius='lg'
              _dark={{ boxShadow: 'dark-lg' }}
              boxShadow='2xl'
            >

              <Text fontSize='xl' fontWeight='semibold'>Bids</Text>
              <Divider />

              <FormControl>
                <FormLabel display='flex' alignItems='center'>
                  Max auto-bid amount
                  <Tooltip label='The max amount that the auto-bid feature can use' placement='top' aria-label='bid alert info tooltip'>
                    <QuestionOutlineIcon ml='2' />
                  </Tooltip>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                  />
                  <Input name='auto_bid_max_amount' value={auto_bid_max_amount} onChange={onInputChange} type='number' />
                </InputGroup>
                <FormHelperText>It will be split between all items you auto bid </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel display='flex' alignItems='center'>
                  Bid Alert
                  <Tooltip label='Notify you when a certain % of the max auto-bid amount is used' placement='top' aria-label='bid alert info tooltip'>
                    <QuestionOutlineIcon ml='2' />
                  </Tooltip>
                </FormLabel>
                <InputGroup>
                  <Input name='auto_bid_alert' value={auto_bid_alert} onChange={onInputChange} type='number' />
                  <InputRightElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='%'
                  />
                </InputGroup>
              </FormControl>

            </Flex>
          )
        }

        <Button colorScheme='teal' isLoading={isLoading} disabled={!canSave} onClick={onClickSave}>Save Changes</Button>

      </Center>

    </AppLayout>
  );
};
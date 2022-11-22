import { FC, useEffect, useState } from 'react';
import { Box, Checkbox, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';

import { Countdown } from '../Countdown';
import { Item } from '../../../common/types';
import { ItemModalLayout } from '../../layout';
import { close } from '../../../store/itemDetail';
import { getNewDateString, itemsAreDifferent } from '../../utils';
import { useForm, useGlobalDispatch, useGlobalSelector } from '../../../hooks';
import { startCreatingItem, startLoadingItems, startModifyingItem } from '../../../store/item';


/**
 * Used for item detail view, item creation and item update.
 */
export const ItemDetailModal: FC = () => {

  const dispatch = useGlobalDispatch();
  const [canSave, setCanSave] = useState(false);
  const { isAdmin } = useGlobalSelector(state => state.auth);
  const { page, filters } = useGlobalSelector(state => state.item);
  const { selectedItem } = useGlobalSelector(state => state.itemDetail);



  // Listen for changes in global selected item and applies the view
  useEffect(() => {
    if (!selectedItem) { clearValues(); return; }

    setValues({
      title: selectedItem.title,
      description: selectedItem.description,
      last_bid_price: selectedItem.last_bid_price,
      last_bid_username: selectedItem.last_bid_username,
      closes_at: selectedItem.closes_at
    });
  }, [selectedItem]);



  const { values, onInputChange, setValues, clearValues } = useForm({
    title: '',
    description: '',
    last_bid_price: 0,
    last_bid_username: '',
    closes_at: getNewDateString()
  });
  const { title, description, last_bid_price, last_bid_username, closes_at } = values;



  // Read changes of input values to determinate if the item has been modified or if it is valid
  // This for disabling the save when the item has not been changed or is not valid
  useEffect(() => {

    // Item Create and Update validation
    if (!title) { setCanSave(false); return; }
    if (title.length > 20) { setCanSave(false); return; }
    if (!description) { setCanSave(false); return; }
    if (!closes_at) { setCanSave(false); return; }


    // Item Update Validation specific
    if (selectedItem) {
      if (!itemsAreDifferent(selectedItem, { title, description, closes_at } as Item)) { setCanSave(false); return; }
    }

    setCanSave(true);

  }, [title, description, closes_at]);



  // Saves New / Updated Item
  const handleSave = async () => {

    const newItem: Item = {
      id: selectedItem ? selectedItem.id : null,
      title: title,
      description: description,
      closes_at: closes_at
    } as Item;


    // If it is updating
    if (selectedItem) {
      await dispatch(startModifyingItem(newItem));
    }
    // If it is creation
    else {

      // Do not load price before because price is not updatable unless it is a bid by an user
      newItem.last_bid_price = last_bid_price;

      await dispatch(startCreatingItem(newItem));
    }


    // Waits for saving and load items again to see the changes at the item list
    dispatch(startLoadingItems(page, filters));

    dispatch(close());
  };


  return (
    <ItemModalLayout isNewItem={!selectedItem} canSave={canSave} onSave={handleSave} >
      <FormControl mb='3'>
        <FormLabel>Title</FormLabel>
        <Input type='text' maxLength={20} name='title' value={title} onChange={onInputChange} readOnly={!isAdmin || selectedItem?.closed} />
      </FormControl>
      <FormControl mb='3'>
        <FormLabel>Description</FormLabel>
        <Textarea name='description' value={description} onChange={onInputChange} readOnly={!isAdmin || selectedItem?.closed} />
      </FormControl>
      <Flex gap='3' mb='3' flexDirection={{ base: 'column', sm: 'row' }}>
        <FormControl>
          <FormLabel>Last Bid User</FormLabel>
          <Input type='text' name='last_bid_username' value={last_bid_username} disabled />
        </FormControl>
        <FormControl>
          <FormLabel>{!selectedItem || !selectedItem?.last_bid_user ? 'Starting Price' : 'Last Bid Price'}</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              fontSize='1.2em'
              children='$'
            />
            <Input type='number' name='last_bid_price' value={last_bid_price} onChange={onInputChange} disabled={!!selectedItem} />
          </InputGroup>
        </FormControl>
      </Flex>

      {isAdmin ?
        (
          <FormControl mb='3'>
            <FormLabel>Close Date</FormLabel>
            <Input type='datetime-local' name='closes_at' step={1} value={closes_at} onChange={onInputChange} readOnly={!isAdmin || selectedItem?.closed} />
          </FormControl>
        ) : (
          <Box mt='10'>
            <Countdown item={selectedItem} />
          </Box>
        )
      }

    </ItemModalLayout>
  );
};
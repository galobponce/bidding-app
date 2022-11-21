import { FC, useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';

import { Item } from '../../../common/types';
import { ItemModalLayout } from '../../layout';
import { getNewDateString, itemsAreDifferent } from '../../utils';
import { useForm, useGlobalDispatch, useGlobalSelector } from '../../../hooks';
import { startCreatingItem, startLoadingItems, startModifyingItem } from '../../../store/item';


/**
 * Used for item detail view, item creation and item update.\
 * Pass item as null if want to use it for item creation
 */
export const ItemDetailModal: FC<ItemModalInterface> = ({
  item, isOpen, onClose
}) => {


  const dispatch = useGlobalDispatch();
  const [canSave, setCanSave] = useState(false);
  const { isAdmin } = useGlobalSelector(state => state.auth);
  const { page, filters } = useGlobalSelector(state => state.item);


  // Use item values if given
  const { values, onInputChange } = useForm({
    title: item ? item.title : '',
    description: item ? item.description : '',

    // || 0 to do not allow 'null' to crash the input
    last_bid_price: item ? item.last_bid_price || 0 : 0,

    closes_at: item ? item.closes_at : getNewDateString()
  });
  const { title, description, last_bid_price, closes_at } = values;



  // Read changes of input values to determinate if the item has been modified or if it is valid
  // This for disabling the save when the item has not been changed or is not valid
  useEffect(() => {


    // Item Create and Update validation
    if (!title) { setCanSave(false); return; }
    if (title.length > 20) { setCanSave(false); return; }
    if (!description) { setCanSave(false); return; }
    if (!closes_at) { setCanSave(false); return; }


    // Item Update Validation specific
    if (item) {
      if (!itemsAreDifferent(item, { title, description, closes_at } as Item)) { setCanSave(false); return; }
    }

    setCanSave(true);

  }, [title, description, closes_at]);



  // Saves New / Updated Item
  const handleSave = async () => {

    const newItem: Item = {
      id: item ? item.id : null,
      title: title,
      description: description,
      closes_at: closes_at
    } as Item;


    // If it is updating
    if (item) {
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

    onClose();
  };


  return (
    <ItemModalLayout isOpen={isOpen} newItem={!item} isAdmin={isAdmin} canSave={canSave} onClose={onClose} onSave={handleSave} >
      <FormControl mb='3'>
        <FormLabel>Title</FormLabel>
        <Input type='text' maxLength={20} name='title' value={title} onChange={onInputChange} readOnly={!isAdmin} />
      </FormControl>
      <FormControl mb='3'>
        <FormLabel>Description</FormLabel>
        <Textarea name='description' value={description} onChange={onInputChange} readOnly={!isAdmin} />
      </FormControl>
      <FormControl mb='3'>
        <FormLabel>{!item ? 'Starting Price' : 'Last Bid Price'}</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            fontSize='1.2em'
            children='$'
          />
        <Input type='number' name='last_bid_price' value={last_bid_price} onChange={onInputChange} disabled={!!item} />
        </InputGroup>
      </FormControl>
      <FormControl mb='3'>
        <FormLabel>Close Date</FormLabel>
        <Input type='datetime-local' name='closes_at' step={1} value={closes_at} onChange={onInputChange} readOnly={!isAdmin} />
      </FormControl>
    </ItemModalLayout>
  );
};



interface ItemModalInterface {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};
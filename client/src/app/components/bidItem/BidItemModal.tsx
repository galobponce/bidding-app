import { FC, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalHeader, ModalCloseButton, FormHelperText } from '@chakra-ui/react';

import { Item } from '../../../common/types';
import { startBidItem } from '../../../store/item';
import { useForm, useGlobalDispatch, useGlobalSelector } from '../../../hooks';


export const BidItemModal: FC<BidItemModalInterface> = ({ item, isOpen, onClose }) => {


  const dispatch = useGlobalDispatch();
  const { uid } = useGlobalSelector(state => state.auth);
  const { isLoading } = useGlobalSelector(state => state.item);


  useEffect(() => {
    if (!item) return;

    setValues({
      price: item.last_bid_price
    })

  }, [item]);


  const { values, onInputChange, setValues } = useForm({
    price: 0,
  });
  const { price } = values;


  const handleSubmit = async () => {

    const success = await dispatch(startBidItem(item.id, Number(uid), price));

    // If it was successfully bided, closes the modal
    if (success) onClose();

  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx='1rem'>

        <ModalHeader>Bid</ModalHeader>
        <ModalCloseButton />

        <ModalBody>

          <FormControl >
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                fontSize='1.2em'
                children='$'
              />
              <Input type='number' name='price' value={price} onChange={onInputChange} />
            </InputGroup>
            <FormHelperText>The price must be higher than the last bid price.</FormHelperText>
          </FormControl>

        </ModalBody>


        <ModalFooter gap='2'>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='teal' onClick={handleSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



interface BidItemModalInterface {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};
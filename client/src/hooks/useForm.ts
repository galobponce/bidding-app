import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';


type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement
>;


interface UseFormHook<T> {
  values: T;
  onInputChange: (e: FormChangeEvent) => void;
  clearValues: () => void;
  setValues: Dispatch<SetStateAction<T>>;
};


/**
 * Returns a stateful value, 
 * a function to call on each input's `onChange` method,
 * a function to clear the current state
 * and a dispatch to set the current values manually
 */
export const useForm = <T>(initialState = {} as T): UseFormHook<T> => {
  const [values, setValues] = useState(initialState);

  const onInputChange = (e: FormChangeEvent): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const clearValues = (): void => {
    setValues({
      ...initialState
    });
  }

  return { values, onInputChange, clearValues, setValues };
};
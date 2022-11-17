import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { GlobalState } from '../store';


/**
 * Used to access the state from the store
 */
export const useGlobalSelector: TypedUseSelectorHook<GlobalState> = useSelector;
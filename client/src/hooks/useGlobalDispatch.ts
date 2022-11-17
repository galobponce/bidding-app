import { useDispatch } from 'react-redux'

import type { GlobalDispatch } from '../store';


/**
 * Used to dispath functions from the store
 */
export const useGlobalDispatch: () => GlobalDispatch = useDispatch;
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import StoreType from '../types/context/StoreType';

const useTypedSelector: TypedUseSelectorHook<StoreType> = useSelector;

export default useTypedSelector;

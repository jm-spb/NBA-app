import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

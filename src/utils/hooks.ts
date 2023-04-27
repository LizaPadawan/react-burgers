import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState } from "../services/thunk";
import { AppDispatch } from "../services/thunk";

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

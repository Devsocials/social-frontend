import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.action';
import { Auth } from '../../common/auth';

export const initialState = new Auth();

const _authReducer = createReducer(
  initialState,
  on(login, (state, action) => action.payload.loginData),
  on(logout, (state, action) => action.payload.logoutData)
);
export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

import { createAction, props } from '@ngrx/store';
import { Auth } from '../../common/auth';

export const login = createAction('login', props<{ payload: { loginData: Auth } }>());
export const logout = createAction('logout', props<{ payload: { logoutData: Auth } }>());

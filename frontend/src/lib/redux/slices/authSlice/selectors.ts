import type { ReduxState } from '@/lib/redux';


export const selectIsAuth = (state: ReduxState) => (
  state.auth.isAuth
);

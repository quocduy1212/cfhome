import { CHANGE_THEME } from 'app-actions-types';

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  theme,
});

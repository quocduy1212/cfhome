import { CHANGE_THEME } from 'app-actions-types';

const DEFAULT_STATE = {
  row: 3,
  col: 3,
  win: 3,
  theme: 'dracula',
};

const setting = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default setting;

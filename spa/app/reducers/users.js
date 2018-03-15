import { USERS_ME, UPDATE_BOOKMARK, ADD_BOOKMARK, REMOVE_BOOKMARK } from 'app-actions-types';
import { handle } from 'redux-pack';

const DEFAULT_STATE = {
  validated: false,
  bookmarks: [],
  markets: [],
};

const users = (state = DEFAULT_STATE, action) => {
  const { type, payload, market } = action;
  switch (type) {
    case USERS_ME:
      return handle(state, action, {
        start: () => ({
          ...DEFAULT_STATE,
          isLoading: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoading: false,
        }),
        failure: prevState => ({
          ...prevState,
        }),
        success: prevState => ({
          ...prevState,
          ...payload.data,
        }),
      });
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, { ...market }],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(b => `${b.name}${b.exchange}` !== `${market.name}${market.exchange}`) || [],
      };
    case UPDATE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.map(b => {
          if (`${b.name}${b.exchange}` === `${market.name}${market.exchange}`) {
            return { ...b, ...market };
          }
          return { ...b };
        }),
      };
    default:
      return state;
  }
};

export default users;

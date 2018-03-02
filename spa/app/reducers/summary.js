import { LOAD_SUMMARY } from 'app-actions-types';
import { handle } from 'redux-pack';

const DEFAULT_STATE = {
  isLoading: false,
  data: [],
};

const summary = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SUMMARY:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoading: false,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload.error,
        }),
        success: prevState => ({
          ...prevState,
          data: payload.data,
        }),
      });
    default:
      return state;
  }
};

export default summary;

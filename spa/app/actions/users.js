import api from 'lib/api';
import { USERS_ME } from 'app-actions-types';

export const me = email => ({
  type: USERS_ME,
  promise: api.get('/api/users/hello', { email }),
});

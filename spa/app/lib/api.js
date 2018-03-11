import humps from 'humps';
import { toast } from 'react-toastify';
import { store } from '../main';

const withQueryParams = (url, params = {}) => {
  const token = store.getState().users.email;
  const paramsWithToken = { ...params, token };
  return `${url}?${Object.keys({ ...paramsWithToken, token })
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(paramsWithToken[k])}`)
    .join('&')}`;
};

const fetchJson = (url, options = {}) =>
  fetch(url, options)
    .then(res => res.json().then(json => humps.camelizeKeys(json)))
    .then(response => {
      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      }
      return response;
    })
    .catch(() => toast.error('Ops, something went wrong'));

const getJson = url => fetchJson(url);
const postJson = (url, data) =>
  fetchJson(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });

const deleteJson = (url, data) =>
  fetchJson(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
  });

const get = (url, params = {}) => getJson(withQueryParams(url, params));
const post = (url, data = {}) => postJson(withQueryParams(url), data);
const deleteRequest = (url, data = {}) => deleteJson(withQueryParams(url), data);

export default {
  get,
  post,
  delete: deleteRequest,
};

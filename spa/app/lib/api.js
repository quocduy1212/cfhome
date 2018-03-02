import humps from 'humps';

const queryParams = params =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

const fetchJson = url => fetch(url).then(res => res.json().then(json => humps.camelizeKeys(json)));

const get = (url, params = []) => fetchJson(`${url}?${queryParams(params)}`);

export default {
  get,
};

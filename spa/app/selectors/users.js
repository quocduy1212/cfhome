export const availableMarkets = ({ users }) =>
  users.markets.map(m => ({
    ...m,
    label: `${m.name}@${m.exchange}`,
    value: `${m.name}@${m.exchange}`,
  }));

export const getBookmark = (state, exchange, name) =>
  state.users.bookmarks.find(b => `${b.name}${b.exchange}` === `${name}${exchange}`);

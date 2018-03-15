export const availableMarkets = ({ users }) =>
  users.markets.map(m => ({
    ...m,
    label: `${m.name}@${m.exchange}`,
    value: `${m.name}@${m.exchange}`,
  }));

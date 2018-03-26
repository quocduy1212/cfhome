import { createSelector } from 'reselect';

const VOLUME_STABLE_PERCENTAGE = 0.01;

export const volumeBaseMarkets = ({ volume }) => volume.data;

export const orderByVolumeStable = createSelector(volumeBaseMarkets, markets => {
  const tmp = markets.map(m => {
    const history = m.details.dayHistory;
    let stableCount = 0;
    let prevBaseVolume = history[history.length - 1].baseVolume;
    for (let i = history.length - 1; i >= 0; i--) {
      const h = history[i];
      const change = Math.abs((h.baseVolume - prevBaseVolume) / prevBaseVolume);
      if (change < VOLUME_STABLE_PERCENTAGE) {
        stableCount += 1;
      } else {
        break;
      }
      prevBaseVolume = h.baseVolume;
    }
    return {
      stableCount,
      ...m,
    };
  });
  return tmp.sort((a, b) => b.stableCount - a.stableCount);
});

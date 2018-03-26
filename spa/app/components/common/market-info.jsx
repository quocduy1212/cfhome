import React from 'react';
import { toPercentage } from 'app-utils';

const getDailyChangeClass = change => (change > 0 ? 'f6 green' : 'f6 red');

const MarketInfo = ({ className, name, dailyChange, exchange, bookmarked, onAddBookmark, onRemoveBookmark }) => (
  <div className={className}>
    <div>
      <span className="f3 fw7">{name}</span>
      {bookmarked && (
        <i className="material-icons dib ml3 f2 v-btm pointer yellow" onClick={onRemoveBookmark}>
          star
        </i>
      )}
      {!bookmarked && (
        <i className="material-icons dib ml3 f2 v-btm pointer light-gray" onClick={onAddBookmark}>
          star_border
        </i>
      )}
    </div>
    {dailyChange && <div className={getDailyChangeClass(dailyChange)}>{toPercentage(dailyChange)}</div>}
    <div className="f6">{exchange}</div>
  </div>
);

export default MarketInfo;

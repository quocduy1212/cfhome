import React from 'react';
import MarketInfo from './market-list/market-info';

const BookmarkList = ({ className, bookmarks, onRemoveBookmark }) => (
  <div className={className}>
    {bookmarks.map(b => (
      <MarketInfo
        className="mt4 animated fadeInDown"
        key={`${b.name}${b.exchange}`}
        {...b}
        onRemoveBookmark={() => onRemoveBookmark(b)}
      />
    ))}
  </div>
);

export default BookmarkList;

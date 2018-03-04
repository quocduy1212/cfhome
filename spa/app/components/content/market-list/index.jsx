import React from 'react';
import { LoadingEllipsis } from 'app-comps-common';
import MarketDetails from './market-details';

const activeModeClass = 'bb b--blue bw2';
const Content = ({
  className,
  loadingMessage,
  displayMode,
  reordered,
  onAddBookmark,
  onRemoveBookmark,
  onDisplayModeChange,
}) => (
  <section className={`${className}`}>
    <div className="tr mt4 mr3">
      <span
        className={`dib f4 pointer ${displayMode === 'bb' ? activeModeClass : ''}`}
        onClick={() => onDisplayModeChange({ displayMode: 'bb' })}
      >
        BB
      </span>
      <span
        className={`dib f4 ml4 pointer ${displayMode === 'up_trend' ? activeModeClass : ''}`}
        onClick={() => onDisplayModeChange({ displayMode: 'up_trend' })}
      >
        Up Trend
      </span>
    </div>
    {loadingMessage && <LoadingEllipsis className="mt4" text={loadingMessage} />}
    {reordered.map(r => (
      <MarketDetails
        key={r.name}
        className="mt4 animated fadeInDown"
        {...r}
        onAddBookmark={() => onAddBookmark({ name: r.name, exchange: r.exchange, base: r.base, symbol: r.symbol })}
        onRemoveBookmark={() => onRemoveBookmark({ name: r.name, exchange: r.exchange })}
      />
    ))}
  </section>
);

Content.defaultProps = {
  onAddBookmark: () => {},
  onRemoveBookmark: () => {},
  onDisplayModeChange: () => {},
};

export default Content;

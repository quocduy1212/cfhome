import React from 'react';
import { LoadingEllipsis, MarketDetails } from 'app-comps-common';

const Content = ({ className, loadingMessage, reordered, onAddBookmark, onRemoveBookmark, charts }) => (
  <section className={`${className}`}>
    {loadingMessage && <LoadingEllipsis className="mt4" text={loadingMessage} />}
    {reordered.map(r => (
      <MarketDetails
        key={`${r.name}${r.exchange}`}
        className="mt4 animated fadeInDown fl w-third-ns w-100"
        {...r}
        onAddBookmark={() => onAddBookmark({ name: r.name, exchange: r.exchange, base: r.base, symbol: r.symbol })}
        onRemoveBookmark={() => onRemoveBookmark({ id: r.id, name: r.name, exchange: r.exchange })}
        {...charts}
      />
    ))}
  </section>
);

Content.defaultProps = {
  onAddBookmark: () => {},
  onRemoveBookmark: () => {},
};

export default Content;

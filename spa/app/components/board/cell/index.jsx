import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import { Empty } from 'app-comps-common';
import { noOpt } from 'app-game-constants';
import PlayerUtils from 'app-game-player-utils';
import styles from './cell.scss';

const Cell = ({
  content,
  dance,
  nextTurnMarker,
  onCellCick,
  finished,
  theme,
}) => {
  const tdClass = cn(
    theme.cellContainer,
    { 'animated infinite tada': dance },
  );
  const renderEmpty = () => {
    const Marker = PlayerUtils.getMarkerComponentFromContent(nextTurnMarker);
    return finished ? <Empty /> : <Marker className={theme.empty} />;
  };
  const renderContent = () => {
    const Marker = PlayerUtils.getMarkerComponentFromContent(content);
    return <Marker />;
  };
  return (
    <td
      className={tdClass}
      onClick={() => (content === '' && !finished && onCellCick())}
    >
      {content === '' ? renderEmpty() : renderContent()}
    </td>
  );
};
Cell.propTypes = {
  content: PropTypes.string,
  onCellCick: PropTypes.func,
  dance: PropTypes.bool,
  finished: PropTypes.bool,
  nextTurnMarker: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};
Cell.defaultProps = {
  content: '',
  onCellCick: noOpt,
  dance: false,
  finished: false,
};
export default themr('GameTableCell', styles)(Cell);

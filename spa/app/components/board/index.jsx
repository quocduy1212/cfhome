import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import Select from 'react-select';
import { noOpt } from 'app-game-constants';
import * as gameActions from 'app-actions/game';
import * as settingActions from 'app-actions/setting';
import * as gameSelectors from 'app-selectors/game';
import * as settingSelectors from 'app-selectors/setting';
import Table from './table';

import styles from './board.scss';

const Board = ({
  board,
  onCellCick,
  undoable,
  redoable,
  undo,
  redo,
  won,
  newGameHandler,
  changeTheme,
  theme,
  currentTheme,
}) => (
  <section>
    <header className="tc">
      <i
        onClick={() => undoable && undo()}
        className={cn(theme.controller, `material-icons v-top mr3 f2 ${undoable ? 'pointer' : 'o-20'}`)}
        data-tip="Undo"
      >undo</i>
      <i
        onClick={() => (won && newGameHandler())}
        className={cn(theme.controller, `material-icons f2 ${won ? 'pointer' : 'o-20'}`)}
        data-tip="New game"
      >replay</i>
      <i
        onClick={() => redoable && redo()}
        className={cn(theme.controller, `material-icons v-top ml3 f2 ${redoable ? 'pointer' : 'o-20'}`)}
        data-tip="Redo"
      >redo</i>
    </header>
    <Table board={board} onCellCick={onCellCick} />
    <footer className="tc mt3">
      Themes
      <Select
        className={cn(theme.themeSelector, 'tl ml3 dib v-mid')}
        value={currentTheme}
        options={[
          {
            label: 'Dracula',
            value: 'dracula',
          }, {
            label: 'GruvBox',
            value: 'gruvbox',
          }, {
            label: 'Default',
            value: 'default',
          },
        ]}
        onChange={(val) => changeTheme(val.value)}
        clearable={false}
      />
    </footer>
  </section>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onCellCick: PropTypes.func.isRequired,
  undo: PropTypes.func,
  redo: PropTypes.func,
  undoable: PropTypes.bool,
  redoable: PropTypes.bool,
  won: PropTypes.bool,
  newGameHandler: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  currentTheme: PropTypes.string,
};

Board.defaultProps = {
  undoable: false,
  redoable: false,
  undo: noOpt,
  redo: noOpt,
  won: false,
  currentTheme: 'default',
};

const mapStateToProps = (state) => ({
  redoable: gameSelectors.redoable(state),
  undoable: gameSelectors.undoable(state),
  board: gameSelectors.decoratedGameBoard(state),
  won: gameSelectors.won(state),
  currentTheme: settingSelectors.currentTheme(state),
});

export default connect(mapStateToProps, {
  onCellCick: gameActions.placeMarker,
  undo: gameActions.undo,
  redo: gameActions.redo,
  newGameHandler: gameActions.newGame,
  changeTheme: settingActions.changeTheme,
})(themr('GameBoard', styles)(Board));


import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Row from '../row';
import styles from './table.scss';

const Table = ({ board, onCellCick, theme }) => (
  <table className={theme.table}>
    <tbody>
      {
        board.map((cells, rowIndex) =>
          <Row
            key={`row_${rowIndex}`}
            cells={cells}
            rowIndex={rowIndex}
            onCellCick={onCellCick}
          />)
      }
    </tbody>
  </table>
);

Table.propTypes = {
  board: PropTypes.array.isRequired,
  onCellCick: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
export default themr('GameTable', styles)(Table);

import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell';

const Row = ({ cells, rowIndex, onCellCick }) => (
  <tr>
    {
      cells.map((cellData, colIndex) =>
        <Cell
          key={`cell_${colIndex}`}
          {...cellData}
          onCellCick={() => onCellCick(rowIndex, colIndex)}
        />)
    }
  </tr>
);

Row.propTypes = {
  cells: PropTypes.array.isRequired,
  onCellCick: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

export default Row;

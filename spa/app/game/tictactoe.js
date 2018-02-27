export const getVerticalSeq = (board, row, { x, y, content }) => {
  const seq = [];
  for (let xx = x; xx >= 0 && board[xx][y] === content; xx -= 1) {
    seq.push({ x: xx, y });
  }
  for (let xx = x + 1; xx < row && board[xx][y] === content; xx += 1) {
    seq.push({ x: xx, y });
  }
  return seq;
};

const getHorizontalSeq = (board, col, { x, y, content }) => {
  const seq = [];
  for (let yy = y; yy >= 0 && board[x][yy] === content; yy -= 1) {
    seq.push({ x, y: yy });
  }
  for (let yy = y + 1; yy < col && board[x][yy] === content; yy += 1) {
    seq.push({ x, y: yy });
  }
  return seq;
};

const getFirstCrossSeq = (board, row, col, { x, y, content }) => {
  const seq = [];
  for (let xx = x, yy = y; xx >= 0 && yy >= 0 && board[xx][yy] === content; xx -= 1, yy -= 1) {
    seq.push({ x: xx, y: yy });
  }
  for (let xx = x + 1, yy = y + 1; xx < col && yy < row && board[xx][yy] === content; xx += 1, yy += 1) {
    seq.push({ x: xx, y: yy });
  }
  return seq;
};

const getSecondCrossSeq = (board, row, col, { x, y, content }) => {
  const seq = [];
  for (let xx = x, yy = y; xx < col && yy >= 0 && board[xx][yy] === content; xx += 1, yy -= 1) {
    seq.push({ x: xx, y: yy });
  }
  for (let xx = x - 1, yy = y + 1; xx >= 0 && yy < row && board[xx][yy] === content; xx -= 1, yy += 1) {
    seq.push({ x: xx, y: yy });
  }
  return seq;
};

export const endGameSequence = (board, move, { row, col, win }) => {
  let seq = getVerticalSeq(board, row, move);
  if (seq.length === win) {
    return seq;
  }
  seq = getHorizontalSeq(board, col, move);
  if (seq.length === win) {
    return seq;
  }
  seq = getFirstCrossSeq(board, row, col, move);
  if (seq.length === win) {
    return seq;
  }
  seq = getSecondCrossSeq(board, row, col, move);
  if (seq.length === win) {
    return seq;
  }
  return [];
};

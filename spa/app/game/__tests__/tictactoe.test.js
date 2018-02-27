import { endGameSequence } from '../tictactoe';

describe('Vertical Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  let board = [
    ['x', 'o', ''],
    ['x', 'o', ''],
    ['x', '', 'x'],
  ];
  test('should detect vertical seq at {0,0}', () => {
    const move = { x: 0, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
  });
  test('should detect vertical seq at {1,0}', () => {
    const move = { x: 1, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ]);
  });
  test('should detect vertical seq at {2,0}', () => {
    const move = { x: 2, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
  });
});

describe('NOT Vertical Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  let board = [
    ['o', 'o', ''],
    ['x', 'o', ''],
    ['o', '', 'x'],
  ];
  test('should NOT detect vertical seq at {1,0}', () => {
    const move = { x: 1, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([]);
  });
});

describe('Horizontal Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['x', 'x', 'x'],
    ['o', 'o', ''],
    ['o', '', 'x'],
  ];
  test('should detect horizontal seq at {0,0}', () => {
    const move = { x: 0, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]);
  });
  test('should detect horizontal seq at {0,1}', () => {
    const move = { x: 0, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 2 },
    ]);
  });
  test('should detect horizontal seq at {0,2}', () => {
    const move = { x: 0, y: 2, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 2 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ]);
  });
});

describe('NOT Horizontal Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['o', 'x', 'o'],
    ['x', 'o', ''],
    ['o', '', 'x'],
  ];
  test('should NOT detect horizontal seq at {0,1}', () => {
    const move = { x: 0, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([]);
  });
});

describe('First Cross Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['x', 'o', 'x'],
    ['o', 'x', 'o'],
    ['x', 'o', 'x'],
  ];
  test('should detect first cross seq at {0,0}', () => {
    const move = { x: 0, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
  test('should detect first cross seq at {1,1}', () => {
    const move = { x: 1, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ]);
  });
  test('should detect first cross seq at {2,2}', () => {
    const move = { x: 2, y: 2, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]);
  });
});

describe('NOT First Cross Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['o', 'o', ''],
    ['o', 'x', 'o'],
    ['x', 'o', 'o'],
  ];
  test('should NOT detect first cross seq at {1,1}', () => {
    const move = { x: 1, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([]);
  });
});

describe('Second Cross Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['o', 'o', 'x'],
    ['o', 'x', 'o'],
    ['x', 'o', 'o'],
  ];
  test('should detect second cross seq at {2,0}', () => {
    const move = { x: 2, y: 0, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ]);
  });
  test('should detect second cross seq at {1,1}', () => {
    const move = { x: 1, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
    ]);
  });
  test('should detect second cross seq at {0,2}', () => {
    const move = { x: 0, y: 2, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ]);
  });
});

describe('NOT Second Cross Sequence', () => {
  const setting = { row: 3, col: 3, win: 3 };
  const board = [
    ['o', 'o', ''],
    ['o', 'x', 'o'],
    ['x', 'o', 'o'],
  ];
  test('should NOT detect second cross seq at {1,1}', () => {
    const move = { x: 1, y: 1, content: 'x' };
    expect(endGameSequence(board, move, setting)).toEqual([]);
  });
});


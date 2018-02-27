import { X, O } from 'app-comps-common';

const FIRST_PLAYER = 0;
const SECOND_PLAYER = 1;
const PLAYER_MARKERS = ['X', 'O'];
const COMPONENT_MARKERS = { X, O };

const getPlayerMarker = (player) => PLAYER_MARKERS[player];
const getNextPlayer = (player) => (player === FIRST_PLAYER ? SECOND_PLAYER : FIRST_PLAYER);
const getPlayerFromMarker = (marker) => (PLAYER_MARKERS[FIRST_PLAYER] === marker ? FIRST_PLAYER : SECOND_PLAYER);
const isFirstPlayer = (player) => player === FIRST_PLAYER;
const isFirstPlayerFromContent = (content) => getPlayerFromMarker(content) === FIRST_PLAYER;
const isSecondPlayerFromContent = (content) => getPlayerFromMarker(content) === SECOND_PLAYER;
const getFirstPlayer = () => FIRST_PLAYER;
const getFirstPlayerMarker = () => PLAYER_MARKERS[FIRST_PLAYER];
const getSecondPlayerMarker = () => PLAYER_MARKERS[SECOND_PLAYER];
const getMarkerComponentFromContent = (content) => COMPONENT_MARKERS[content];

const PlayerUtils = {
  isFirstPlayer,
  isFirstPlayerFromContent,
  isSecondPlayerFromContent,
  getPlayerMarker,
  getNextPlayer,
  getPlayerFromMarker,
  getFirstPlayer,
  getFirstPlayerMarker,
  getSecondPlayerMarker,
  getMarkerComponentFromContent,
};

export default PlayerUtils;

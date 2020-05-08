import Game from "./TTTGame.js";

const TTTData = {};

TTTData.createState0 = () =>
  Immutable({
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayerId: 1,
    playerInstances: {
      1: { id: 1, name: "Alfred", team: "X" },
      2: { id: 2, name: "Bruce", team: "O" },
    },
  });

TTTData.createState1 = () =>
  Immutable({
    ...TTTData.createState0(),
    board: ["X", null, null, null, "O", null, null, null, null],
  });

TTTData.createState2 = () =>
  Immutable({
    ...TTTData.createState0(),
    board: ["X", "X", null, null, "O", null, "O", null, null],
  });

TTTData.createGame = (state = TTTData.createState0()) => new Game(state);

TTTData.createGame0 = () => new Game(TTTData.createState0());

TTTData.createGame1 = () => new Game(TTTData.createState1());

TTTData.createGame2 = () => new Game(TTTData.createState2());

Object.freeze(TTTData);

export default TTTData;

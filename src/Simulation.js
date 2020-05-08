import ArrayUtils from "./ArrayUtilities.js";

const Simulation = {};

Simulation.execute = (child, roundLimit = 100) => {
  const { game: game0 } = child;
  const game = game0.clone();
  let round = 1;
  let moves = game.getPossibleMoves();
  let winner = game.getWinner();

  while (!winner && round < roundLimit && moves.length > 0) {
    const move = ArrayUtils.randomElement(moves);
    game.performMove(move);

    round += 1;
    winner = game.getWinner();
    moves = game.getPossibleMoves();
  }

  return winner;
};

Object.freeze(Simulation);

export default Simulation;

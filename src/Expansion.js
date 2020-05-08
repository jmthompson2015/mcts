import ArrayUtils from "./ArrayUtilities.js";
import Node from "./Node.js";

const Expansion = {};

Expansion.execute = (leaf0) => {
  const leaf = leaf0;
  const { game } = leaf;

  const moves = game.getPossibleMoves();
  const mapFunction = (move) => {
    const newState = Immutable({ ...game.state, move });
    const newGame = new game.constructor(newState);
    newGame.performMove(move);

    return Node.create({ game: newGame, parent: leaf });
  };
  leaf.children = R.map(mapFunction, moves);

  return ArrayUtils.randomElement(leaf.children);
};

Object.freeze(Expansion);

export default Expansion;

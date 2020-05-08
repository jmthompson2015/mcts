/* eslint new-cap: ["error", { "capIsNew": false, "newIsCap": false }] */

import ArrayUtils from "./ArrayUtilities.js";
import Node from "./Node.js";

const Expansion = {};

Expansion.execute = (leaf0, gameClass) => {
  const leaf = leaf0;
  const { game } = leaf;

  const moveStates = game.getPossibleMoves();
  const mapFunction = (moveState) => {
    const state2 = Immutable({
      ...game.state,
      currentMoves: moveStates,
      currentMove: moveState,
    });
    const game2 = new gameClass(state2);
    game2.performMove(moveState);

    return Node.create({ game: game2, parent: leaf });
  };
  leaf.children = R.map(mapFunction, moveStates);

  return ArrayUtils.randomElement(leaf.children);
};

Object.freeze(Expansion);

export default Expansion;

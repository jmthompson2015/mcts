// Monte Carlo Tree Search
// see https://en.wikipedia.org/wiki/Monte_Carlo_tree_search

/* eslint no-underscore-dangle: ["error", { "allow": ["_backpropagation", "_expansion", "_game",
  "_selection", "_simulation"] }] */

import Backpropagation from "./Backpropagation.js";
import Expansion from "./Expansion.js";
import Node from "./Node.js";
import Selection from "./Selection.js";
import Simulation from "./Simulation.js";

const determineBestMove = (root) => {
  const bestChildNode = Node.best(R.prop("playoutCount"), root.children, true);

  return bestChildNode ? bestChildNode.move : undefined;
};

class MCTS {
  constructor({
    game,
    selection = Selection,
    expansion = Expansion,
    simulation = Simulation,
    backpropagation = Backpropagation,
  }) {
    if (R.isNil(game)) {
      throw new Error(`MCTS constructor(): game is required`);
    }
    this._game = game;
    this._selection = selection;
    this._expansion = expansion;
    this._simulation = simulation;
    this._backpropagation = backpropagation;
  }

  executeSteps(startTime, root, resolve, roundLimit, allowedTime) {
    let time = Date.now();

    while (time - startTime < allowedTime) {
      const leaf = this._selection.execute(root);
      const isGameOver = leaf.isGameOver || leaf.game.isGameOver();

      if (isGameOver) {
        const winner = leaf.winner || leaf.game.getWinner();
        leaf.isGameOver = isGameOver;
        leaf.winner = winner;
        this._backpropagation.execute(winner, leaf);
      } else {
        const child = this._expansion.execute(leaf);

        if (!R.isNil(child)) {
          const winner = this._simulation.execute(child, roundLimit);
          this._backpropagation.execute(winner, child);
        }
      }

      time = Date.now();
    }

    const move = determineBestMove(root);
    resolve(move);
  }

  execute(roundLimit = 100, allowedTime = 1000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const root = Node.create({ game: this._game });
      this.executeSteps(startTime, root, resolve, roundLimit, allowedTime);
    });
  }
}

Object.freeze(MCTS);

export default MCTS;

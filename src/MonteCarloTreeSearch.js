// Monte Carlo Tree Search
// see https://en.wikipedia.org/wiki/Monte_Carlo_tree_search

/* eslint no-underscore-dangle: ["error", { "allow": ["_backpropagationClass", "_expansionClass",
  "_gameClass", "_selectionClass", "_simulationClass"] }] */

import Backpropagation from "./Backpropagation.js";
import Expansion from "./Expansion.js";
import Node from "./Node.js";
import Selection from "./Selection.js";
import Simulation from "./Simulation.js";

const determineBestMove = (root) => {
  const bestChildNode = Node.best(R.prop("playoutCount"), root.children, true);
  let answer;

  if (bestChildNode) {
    const { game } = bestChildNode;
    const { state } = game;
    answer = state.currentMove;
  }

  return answer;
};

class MCTS {
  constructor(
    gameClass,
    selectionClass = Selection,
    expansionClass = Expansion,
    simulationClass = Simulation,
    backpropagationClass = Backpropagation
  ) {
    this._gameClass = gameClass;
    this._selectionClass = selectionClass;
    this._expansionClass = expansionClass;
    this._simulationClass = simulationClass;
    this._backpropagationClass = backpropagationClass;
  }

  executeSteps(startTime, root, resolve, roundLimit, allowedTime) {
    let time = Date.now();

    while (time - startTime < allowedTime) {
      const leaf = this._selectionClass.execute(root);
      const isGameOver = leaf.isGameOver || leaf.game.isGameOver();

      if (isGameOver) {
        const winner = leaf.winner || leaf.game.getWinner();
        leaf.isGameOver = isGameOver;
        leaf.winner = winner;
        this._backpropagationClass.execute(winner, leaf);
      } else {
        const child = this._expansionClass.execute(leaf, this._gameClass);
        const winner = this._simulationClass.execute(child, roundLimit);
        this._backpropagationClass.execute(winner, child);
      }

      time = Date.now();
    }

    const move = determineBestMove(root);
    resolve(move);
  }

  execute(game, roundLimit = 100, allowedTime = 5000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const root = Node.create({ game });
      this.executeSteps(startTime, root, resolve, roundLimit, allowedTime);
    });
  }
}

Object.freeze(MCTS);

export default MCTS;

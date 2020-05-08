(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MonteCarloTreeSearch = factory());
}(this, (function () { 'use strict';

  const ArrayUtilities = {};

  ArrayUtilities.randomElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  ArrayUtilities.remove = (element, array) => {
    let answer = array;
    const index = array.indexOf(element);

    if (index > -1) {
      answer = [...array]; // new array copy
      answer.splice(index, 1);
    }

    return answer;
  };

  Object.freeze(ArrayUtilities);

  const Node = {};

  const C = Math.sqrt(2.0); // exploration parameter

  const compareAsFloat = (a, b) => parseFloat(a) - parseFloat(b);

  Node.MAX_NUMBER = 1000000;

  Node.create = ({
    // Required.
    game,
    // Optional.
    children = [],
    isGameOver = false,
    move = null,
    parent,
    playoutCount = 0,
    winCount = 0,
    winner = null,
  }) => ({
    children,
    game,
    isGameOver,
    move,
    parent,
    playoutCount,
    winCount,
    winner,
  });

  Node.accept = (node, visitor) => {
    visitor.visit(node);

    if (node.children.length > 0) {
      const forEachFunction = (c) => Node.accept(c, visitor);
      R.forEach(forEachFunction, node.children);
    }
  };

  Node.best = (evalFunction, nodes) => {
    let answer;

    if (nodes) {
      if (nodes.length === 1) {
        [answer] = nodes;
      } else {
        const ratingToNodes = R.groupBy(evalFunction, nodes);
        const ratings = Object.keys(ratingToNodes);
        ratings.sort(compareAsFloat);
        const bestRating = R.last(ratings);
        const bestNodes = ratingToNodes[bestRating];

        answer =
          bestNodes.length === 1
            ? bestNodes[0]
            : ArrayUtilities.randomElement(bestNodes);
      }
    }

    return answer;
  };

  Node.exploitation = (node) => {
    const ni = node.playoutCount;

    if (ni === 0) {
      return Node.MAX_NUMBER;
    }

    const wi = node.winCount;

    return wi / ni;
  };

  Node.exploration = (node) => {
    const ni = node.playoutCount;

    if (ni === 0) {
      return Node.MAX_NUMBER;
    }

    const Ni = node.parent ? Math.max(node.parent.playoutCount, 1) : 1;

    return C * Math.sqrt(Math.log(Ni) / ni);
  };

  Node.root = (node0) => {
    let node = node0;

    while (node && node.parent) {
      node = node.parent;
    }

    return node;
  };

  // Upper Confidence Bound 1 applied to Trees
  Node.uct = (node) => {
    return Node.exploitation(node) + Node.exploration(node);
  };

  Object.freeze(Node);

  const Backpropagation = {};

  Backpropagation.execute = (winner, child) => {
    const root = Node.root(child);
    const { game } = root;
    const currentPlayer = game.getCurrentPlayer();
    let node = child;

    while (node && currentPlayer) {
      if (R.isNil(winner)) {
        // Draw.
        node.winCount += 0.5;
      } else if (winner === currentPlayer) {
        // Win.
        node.winCount += 1;
      }

      node.playoutCount += 1;
      node = node.parent;
    }
  };

  Object.freeze(Backpropagation);

  const Expansion = {};

  Expansion.execute = (leaf0) => {
    const leaf = leaf0;
    const { game } = leaf;

    const moves = game.getPossibleMoves();
    const mapFunction = (move) => {
      const newGame = game.clone();
      newGame.performMove(move);

      return Node.create({ game: newGame, move, parent: leaf });
    };
    leaf.children = R.map(mapFunction, moves);

    return ArrayUtilities.randomElement(leaf.children);
  };

  Object.freeze(Expansion);

  const Selection = {};

  Selection.execute = (root) => {
    let answer = root;

    while (answer.children.length > 0) {
      answer = Node.best(Node.uct, answer.children);
    }

    return answer;
  };

  Object.freeze(Selection);

  const Simulation = {};

  Simulation.execute = (child, roundLimit = 100) => {
    const { game: game0 } = child;
    const game = game0.clone();
    let round = 1;
    let moves = game.getPossibleMoves();
    let winner = game.getWinner();

    while (!winner && round < roundLimit && moves.length > 0) {
      const move = ArrayUtilities.randomElement(moves);
      game.performMove(move);

      round += 1;
      winner = game.getWinner();
      moves = game.getPossibleMoves();
    }

    return winner;
  };

  Object.freeze(Simulation);

  // Monte Carlo Tree Search

  const determineBestMove = (root) => {
    const bestChildNode = Node.best(R.prop("playoutCount"), root.children, true);

    return bestChildNode ? bestChildNode.move : undefined;
  };

  class MCTS {
    constructor(
      game,
      selectionClass = Selection,
      expansionClass = Expansion,
      simulationClass = Simulation,
      backpropagationClass = Backpropagation
    ) {
      this._game = game;
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
          const child = this._expansionClass.execute(leaf);
          const winner = this._simulationClass.execute(child, roundLimit);
          this._backpropagationClass.execute(winner, child);
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

  return MCTS;

})));

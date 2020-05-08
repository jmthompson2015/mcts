import Node from "./Node.js";

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
    } else if (winner === currentPlayer.team) {
      // Win.
      node.winCount += 1;
    }

    node.playoutCount += 1;
    node = node.parent;
  }
};

Object.freeze(Backpropagation);

export default Backpropagation;

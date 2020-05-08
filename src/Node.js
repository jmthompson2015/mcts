import ArrayUtils from "./ArrayUtilities.js";

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
          : ArrayUtils.randomElement(bestNodes);
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

export default Node;

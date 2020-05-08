import Node from "./Node.js";

QUnit.module("Node");

const PROPS = ["children", "game", "parent", "playoutCount", "winCount"];

const createTTTData = () =>
  Node.create({
    children: 1,
    game: 2,
    parent: 3,
    playoutCount: 4,
    winCount: 5,
  });

const round4 = (n) => Math.round(n * 1000.0) / 1000.0;

QUnit.test("best() single playout count", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1, winCount: 0, playoutCount: 10 });
  const node2 = Node.create({ game: 2, winCount: 1, playoutCount: 11 });
  const node3 = Node.create({ game: 3, winCount: 2, playoutCount: 12 });
  const node4 = Node.create({ game: 4, winCount: 3, playoutCount: 13 });
  const nodes = [node1, node2, node3, node4];

  // Run.
  const result = Node.best(R.prop("playoutCount"), nodes);

  // Verify.
  assert.ok(result);
  assert.equal(result.playoutCount, 13);
  assert.equal(result.game, 4);
  assert.equal(result.winCount, 3);
});

QUnit.test("best() dual playout count", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1, winCount: 0, playoutCount: 10 });
  const node2 = Node.create({ game: 2, winCount: 1, playoutCount: 10 });
  const node3 = Node.create({ game: 3, winCount: 2, playoutCount: 11 });
  const node4 = Node.create({ game: 4, winCount: 3, playoutCount: 11 });
  const nodes = [node1, node2, node3, node4];

  // Run.
  const result = Node.best(R.prop("playoutCount"), nodes);

  // Verify.
  assert.ok(result);
  assert.equal(result.playoutCount, 11);
  assert.equal([3, 4].includes(result.game), true);
  assert.equal([2, 3].includes(result.winCount), true);
});

QUnit.test("best() single rating", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1, winCount: 0, playoutCount: 10 });
  const node2 = Node.create({ game: 2, winCount: 1, playoutCount: 10 });
  const node3 = Node.create({ game: 3, winCount: 2, playoutCount: 10 });
  const node4 = Node.create({ game: 4, winCount: 3, playoutCount: 10 });
  const nodes = [node1, node2, node3, node4];

  // Run.
  const result = Node.best(Node.exploitation, nodes);

  // Verify.
  assert.ok(result);
  assert.equal(result.playoutCount, 10);
  assert.equal(result.game, 4);
  assert.equal(result.winCount, 3);
});

QUnit.test("best() dual rating", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1, winCount: 0, playoutCount: 10 });
  const node2 = Node.create({ game: 2, winCount: 1, playoutCount: 10 });
  const node3 = Node.create({ game: 3, winCount: 2, playoutCount: 10 });
  const node4 = Node.create({ game: 4, winCount: 3, playoutCount: 10 });
  const node5 = Node.create({ game: 5, winCount: 3, playoutCount: 10 });
  const nodes = [node1, node2, node3, node4, node5];

  // Run.
  const result = Node.best(Node.exploitation, nodes);

  // Verify.
  assert.ok(result);
  assert.equal(result.playoutCount, 10);
  assert.equal(
    [4, 5].includes(result.game),
    true,
    `result.game = ${result.game}`
  );
  assert.equal(result.winCount, 3);
});

QUnit.test("create()", (assert) => {
  // Run.
  const node = createTTTData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(node[prop], i + 1);
  });
});

QUnit.test("exploitation()", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1, winCount: 0, playoutCount: 0 });
  const node2 = Node.create({ game: 2, winCount: 1, playoutCount: 0 });
  const node3 = Node.create({ game: 2, winCount: 0, playoutCount: 10 });
  const node4 = Node.create({ game: 2, winCount: 1, playoutCount: 10 });
  const node5 = Node.create({ game: 3, winCount: 2, playoutCount: 10 });

  // Run / Verify.
  assert.equal(Node.exploitation(node1), Node.MAX_NUMBER);
  assert.equal(Node.exploitation(node2), Node.MAX_NUMBER);
  assert.equal(Node.exploitation(node3), 0);
  assert.equal(Node.exploitation(node4), 0.1);
  assert.equal(Node.exploitation(node5), 0.2);
});

QUnit.test("exploration()", (assert) => {
  // Setup.
  const parent1 = Node.create({ game: -1, playoutCount: 0 });
  const parent2 = Node.create({ game: -2, playoutCount: 20 });
  const node1 = Node.create({ game: 1, playoutCount: 0 });
  const node2 = Node.create({ game: 2, playoutCount: 10 });
  const node3 = Node.create({ game: 1, parent: parent1, playoutCount: 0 });
  const node4 = Node.create({ game: 2, parent: parent1, playoutCount: 10 });
  const node5 = Node.create({ game: 3, parent: parent2, playoutCount: 0 });
  const node6 = Node.create({ game: 4, parent: parent2, playoutCount: 10 });

  // Run / Verify.
  assert.equal(Node.exploration(node1), Node.MAX_NUMBER);
  assert.equal(Node.exploration(node2), 0);
  assert.equal(round4(Node.exploration(node3)), Node.MAX_NUMBER);
  assert.equal(round4(Node.exploration(node4)), 0);
  assert.equal(round4(Node.exploration(node5)), Node.MAX_NUMBER);
  assert.equal(round4(Node.exploration(node6)), 0.774);
});

QUnit.test("root()", (assert) => {
  // Setup.
  const node1 = Node.create({ game: 1 });
  const node2 = Node.create({ game: 2, parent: node1 });
  const node3 = Node.create({ game: 3, parent: node2 });
  const node4 = Node.create({ game: 4, parent: node3 });

  // Run.
  const result = Node.root(node4);

  // Verify.
  assert.equal(result, node1);
});

const NodeTest = {};
export default NodeTest;

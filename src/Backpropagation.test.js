import Backpropagation from "./Backpropagation.js";
import Expansion from "./Expansion.js";
import Node from "./Node.js";
import Selection from "./Selection.js";
import TTTData from "./TTTData.js";
import TTTGame from "./TTTGame.js";

QUnit.module("Backpropagation");

QUnit.test("execute() draw", (assert) => {
  // Setup.
  const game = TTTData.createGame();
  const root = Node.create({ game });
  const leaf = Selection.execute(root);
  const child = Expansion.execute(leaf, TTTGame);
  const winner = undefined;

  // Run.
  Backpropagation.execute(winner, child);

  // Verify.
  assert.equal(root.winCount, 0.5);
  assert.equal(root.playoutCount, 1);
});

QUnit.test("execute() loss", (assert) => {
  // Setup.
  const state0 = TTTData.createState0();
  const state1 = {
    ...state0,
    board: ["X", null, null, null, "O", null, null, null, null],
  };
  const state2 = {
    ...state1,
    board: ["X", "O", null, null, "O", null, null, "O", null],
  };
  const game0 = new TTTGame(state0);
  const game1 = new TTTGame(state1);
  const game2 = new TTTGame(state2);
  const root = Node.create({ game: game0 });
  const leaf = Node.create({ game: game1, parent: root });
  const child = Node.create({ game: game2, parent: leaf });
  const winner = "O";

  // Run.
  Backpropagation.execute(winner, child);

  // Verify.
  assert.equal(root.winCount, 0);
  assert.equal(root.playoutCount, 1);
});

QUnit.test("execute() win", (assert) => {
  // Setup.
  const state0 = TTTData.createState0();
  const state1 = {
    ...state0,
    board: ["X", "X", null, null, "O", null, null, null, null],
  };
  const state2 = {
    ...state1,
    board: ["X", "X", "X", null, "O", null, null, null, null],
  };
  const game0 = new TTTGame(state0);
  const game1 = new TTTGame(state1);
  const game2 = new TTTGame(state2);
  const root = Node.create({ game: game0 });
  const leaf = Node.create({ game: game1, parent: root });
  const child = Node.create({ game: game2, parent: leaf });
  const winner = state0.playerInstances[1];

  // Run.
  Backpropagation.execute(winner, child);

  // Verify.
  assert.equal(root.winCount, 1);
  assert.equal(root.playoutCount, 1);
});

const BackpropagationTest = {};
export default BackpropagationTest;

import TTTData from "./TTTData.js";

import MCTS from "./MonteCarloTreeSearch.js";

QUnit.module("MCTS");

const ALLOWED_TIME = 100;
const ROUND_LIMIT = 10;

QUnit.test("execute() 1", (assert) => {
  // Setup.
  const game = TTTData.createGame1();
  const mcts = new MCTS(game);

  // Run.
  const done = assert.async();
  const callback = (move) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(move);
    assert.equal(
      [1, 2, 3, 5, 6, 7, 8].includes(move.index),
      true,
      `move.index = ${move.index}`
    );
    assert.equal(move.token, "X");
    done();
  };

  mcts.execute(ROUND_LIMIT, ALLOWED_TIME).then(callback);
});

QUnit.test("execute() 2", (assert) => {
  // Setup.
  const game = TTTData.createGame2();
  const mcts = new MCTS(game);

  // Run.
  const done = assert.async();
  const callback = (move) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(move);
    assert.equal(move.index, 2, `move.index = ${move.index}`);
    assert.equal(move.token, "X");
    done();
  };

  mcts.execute(ROUND_LIMIT, ALLOWED_TIME).then(callback);
});

const MCTSTest = {};
export default MCTSTest;

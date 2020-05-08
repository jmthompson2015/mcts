import TTTData from "./TTTData.js";

QUnit.module("TTTGame");

QUnit.test("getCurrentPlayer()", (assert) => {
  // Setup.
  const game = TTTData.createGame1();

  // Run.
  const result = game.getCurrentPlayer();

  // Verify.
  assert.ok(result, "result !== undefined");
  assert.equal(result.id, 1, `result.id ? ${result.id}`);
  assert.equal(result.name, "Alfred", `result.name ? ${result.name}`);
  assert.equal(result.team, "X", `result.team ? ${result.team}`);
});

QUnit.test("getPossibleMoves() 1", (assert) => {
  // Setup.
  const game = TTTData.createGame1();

  // Run.
  const result = game.getPossibleMoves();

  // Verify.
  assert.ok(result, "result !== undefined");
  assert.equal(
    Array.isArray(result),
    true,
    `Array.isArray(result) ? ${Array.isArray(result)}`
  );
  assert.equal(result.length, 7, `result.length = ${result.length}`);
  const move0 = result[0];
  assert.ok(move0);
  assert.equal(move0.index, 1);
  assert.equal(move0.token, "X");
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.index, 8);
  assert.equal(moveLast.token, "X");
});

QUnit.test("getPossibleMoves() 2", (assert) => {
  // Setup.
  const game = TTTData.createGame2();

  // Run.
  const result = game.getPossibleMoves();

  // Verify.
  assert.ok(result, "result !== undefined");
  assert.equal(
    Array.isArray(result),
    true,
    `Array.isArray(result) ? ${Array.isArray(result)}`
  );
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const move0 = result[0];
  assert.ok(move0);
  assert.equal(move0.index, 2);
  assert.equal(move0.token, "X");
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.index, 8);
  assert.equal(moveLast.token, "X");
});

QUnit.test("getWinner() 1", (assert) => {
  // Setup.
  const game = TTTData.createGame1();

  // Run.
  const result = game.getWinner();

  // Verify.
  assert.equal(result, undefined, `result = ${result}`);
});

QUnit.test("getWinner() X", (assert) => {
  // Setup.
  const state = {
    ...TTTData.createState0(),
    board: ["X", "X", "X", null, "O", null, null, null, null],
  };
  const game = TTTData.createGame(state);

  // Run.
  const result = game.getWinner();

  // Verify.
  assert.ok(result, "result !== undefined");
  assert.equal(result, "X", `result = ${result}`);
});

QUnit.test("performMove() 2", (assert) => {
  // Setup.
  const move0 = { index: 2, token: "X" };
  const state0 = { ...TTTData.createState2() };
  const game = TTTData.createGame(state0);

  // Run.
  game.performMove(move0);

  // Verify.
  const { state } = game;
  const { board, currentPlayerId } = state;
  assert.equal(board[0], "X", `board[0] = ${board[0]}`);
  assert.equal(board[1], "X", `board[1] = ${board[1]}`);
  assert.equal(board[2], "X", `board[2] = ${board[2]}`);
  assert.equal(board[3], null, `board[3] = ${board[3]}`);
  assert.equal(board[4], "O", `board[4] = ${board[4]}`);
  assert.equal(board[5], null, `board[5] = ${board[5]}`);
  assert.equal(board[6], "O", `board[6] = ${board[6]}`);
  assert.equal(board[7], null, `board[7] = ${board[7]}`);
  assert.equal(board[8], null, `board[8] = ${board[8]}`);

  assert.equal(currentPlayerId, 2, `currentPlayerId = ${currentPlayerId}`);
});

const TTTGameTest = {};
export default TTTGameTest;

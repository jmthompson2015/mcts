import Expansion from "./Expansion.js";
import Node from "./Node.js";
import Selection from "./Selection.js";
import TTTData from "./TTTData.js";
import TTTGame from "./TTTGame.js";

QUnit.module("Selection");

QUnit.test("execute() root", (assert) => {
  // Setup.
  const game = TTTData.createGame();
  const root = Node.create({ game });

  // Run.
  const result = Selection.execute(root);

  // Verify.
  assert.ok(result);
  assert.equal(result, root);
  const { children } = result;
  assert.ok(children);
  assert.equal(
    Array.isArray(children),
    true,
    `Array.isArray(children) ? ${Array.isArray(children)}`
  );
  assert.equal(children.length, 0, `children.length = ${children.length}`);
});

QUnit.test("execute() child", (assert) => {
  // Setup.
  const game = TTTData.createGame();
  const root = Node.create({ game });
  const child = Expansion.execute(root, TTTGame);
  const leaf = Expansion.execute(child, TTTGame);
  assert.ok(leaf);

  // Run.
  const result = Selection.execute(root);

  // Verify.
  assert.ok(result);
  const { children } = result;
  assert.ok(children);
  assert.equal(
    Array.isArray(children),
    true,
    `Array.isArray(children) ? ${Array.isArray(children)}`
  );
  assert.equal(children.length, 0, `children.length = ${children.length}`);
});

const SelectionTest = {};
export default SelectionTest;

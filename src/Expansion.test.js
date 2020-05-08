import Expansion from "./Expansion.js";
import Node from "./Node.js";
import TTTData from "./TTTData.js";
import TTTGame from "./TTTGame.js";

QUnit.module("Expansion");

QUnit.test("execute()", (assert) => {
  // Setup.
  const game = TTTData.createGame1();
  const root = Node.create({ game });

  // Run.
  const result = Expansion.execute(root, TTTGame);

  // Verify.
  assert.ok(result, "result !== undefined");
  const { children: rootChildren } = root;
  assert.equal(
    Array.isArray(rootChildren),
    true,
    `Array.isArray(rootChildren) ? ${Array.isArray(rootChildren)}`
  );
  assert.equal(
    rootChildren.length,
    7,
    `rootChildren.length = ${rootChildren.length}`
  );
  assert.equal(
    rootChildren.includes(result),
    true,
    `rootChildren.includes(result)`
  );

  assert.equal(result.parent, root, "result.parent === root");
  assert.ok(result.game, "result.game !== undefined");

  const { children } = result;
  assert.ok(children, "children !== undefined");
  assert.equal(
    Array.isArray(children),
    true,
    `Array.isArray(children) ? ${Array.isArray(children)}`
  );
  assert.equal(children.length, 0, `children.length = ${children.length}`);
});

const ExpansionTest = {};
export default ExpansionTest;

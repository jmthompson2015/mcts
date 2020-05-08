import Expansion from "./Expansion.js";
import Node from "./Node.js";
import Selection from "./Selection.js";
import Simulation from "./Simulation.js";
import TTTData from "./TTTData.js";
import TTTGame from "./TTTGame.js";

QUnit.module("Simulation");

QUnit.test("execute()", (assert) => {
  // Setup.
  const game = TTTData.createGame();
  const root = Node.create({ game });
  const leaf = Selection.execute(root);
  const child = Expansion.execute(leaf, TTTGame);

  // Run.
  const result = Simulation.execute(child);

  // Verify.
  const { playerInstances } = game.state;
  assert.equal(
    [playerInstances[1], playerInstances[2], undefined].includes(result),
    true,
    `result = ${result}`
  );
});

const SimulationTest = {};
export default SimulationTest;

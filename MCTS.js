import Backpropagation from "./src/Backpropagation.js";
import Expansion from "./src/Expansion.js";
import MonteCarloTreeSearch from "./src/MonteCarloTreeSearch.js";
import Node from "./src/Node.js";
import Selection from "./src/Selection.js";
import Simulation from "./src/Simulation.js";

const MCTS = {};

MCTS.Node = Node;
MCTS.Selection = Selection;
MCTS.Expansion = Expansion;
MCTS.Simulation = Simulation;
MCTS.Backpropagation = Backpropagation;
MCTS.MonteCarloTreeSearch = MonteCarloTreeSearch;

Object.freeze(MCTS);

export default MCTS;

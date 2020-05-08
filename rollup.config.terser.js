const { terser } = require("rollup-plugin-terser");

export default {
  input: "src/MonteCarloTreeSearch.js",
  output: {
    file: "./dist/mcts.min.js",
    format: "umd",
    name: "MonteCarloTreeSearch",
  },
  plugins: [terser()],
};

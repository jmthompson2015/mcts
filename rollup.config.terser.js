const { terser } = require("rollup-plugin-terser");

export default {
  input: "MCTS.js",
  output: {
    file: "./dist/mcts.min.js",
    format: "umd",
    name: "MCTS",
  },
  plugins: [terser()],
};

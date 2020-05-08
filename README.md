# Monte Carlo Tree Search

## Usage

Implement a game class that has the following methods:

- constructor(state) constructor
- clone() returns a clone
- getCurrentPlayer() returns the current player
- getPossibleMoves() returns an array of possible moves
- getWinner() returns the winner or undefined if there is no winner
- isGameOver() returns true if the game is over
- performMove(move) updates the internal state of the game base on the move
- state() getter

```javascript
const mcts = new MonteCarloTreeSearch(Game);
const game = new Game();
const callback = (move) => {
  console.log(move);
};
mcts.execute(game, ROUND_LIMIT, ALLOWED_TIME).then(callback);
```

## Built With

- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code.
- [QUnit](https://qunitjs.com/) - JavaScript unit testing.
- [Ramda](https://ramdajs.com) - A practical functional library for JavaScript programmers.
- [Seamless-Immutable](https://github.com/rtfeldman/seamless-immutable) - Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.

## Inspired By

- [Monte Carlo tree search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search)
- [MCTS](https://github.com/dbravender/mcts)

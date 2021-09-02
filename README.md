# Monte Carlo Tree Search

Implements a [Monte Carlo Tree Search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search) for games.

## Usage

Implement a game class that has the following methods:

- constructor(state) constructor
- clone() returns a clone
- getCurrentPlayer() returns the current player
- getPossibleMoves() returns an array of possible moves
- getWinner() returns the winner or undefined if there is no winner
- isGameOver() returns true if the game is over
- performMove(move) updates the internal state of the game based on the move
- state() getter

Then to get the next move an application should call mcts.execute(), which returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const state = {
  /* ... */
};
const game = new Game(state);
const mcts = new MCTS({ game });
const callback = (move) => {
  console.log(move);
};
mcts.execute(ROUND_LIMIT, ALLOWED_TIME).then(callback);
```

## Built With

- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code.
- [QUnit](https://qunitjs.com/) - JavaScript unit testing.
- [Ramda](https://ramdajs.com) - A practical functional library for JavaScript programmers.
- [Rollup](https://rollupjs.org/guide/en/) - A module bundler for JavaScript
- [Seamless-Immutable](https://github.com/rtfeldman/seamless-immutable) - Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.

## Inspired By

- [Monte Carlo tree search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search)
- [MCTS](https://github.com/dbravender/mcts) by Dan Bravender

/* eslint no-underscore-dangle: ["error", { "allow": ["_state"] }] */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */

class TTTGame {
  constructor(state) {
    this._state = Immutable(state);
  }

  get state() {
    return this._state;
  }

  clone() {
    return new TTTGame(this._state);
  }

  getCurrentPlayer() {
    const { currentPlayerId } = this._state;

    return this._state.playerInstances[currentPlayerId];
  }

  getPossibleMoves() {
    const { board } = this._state;
    const currentPlayer = this.getCurrentPlayer();
    const answer = [];

    for (let i = 0; i < 9; i += 1) {
      if (!board[i]) {
        answer.push({ index: i, token: currentPlayer.team });
      }
    }

    return answer;
  }

  getWinner() {
    const { board } = this._state;
    let answer;

    // Rows.
    for (let i = 0; i < 9 && !answer; i += 3) {
      if (
        board[i] &&
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2]
      ) {
        answer = board[i];
      }
    }

    // Columns.
    for (let i = 0; i < 3 && !answer; i += 1) {
      if (
        board[i] &&
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6]
      ) {
        answer = board[i];
      }
    }

    // Diagonals.
    if (!answer && board[0] && board[0] === board[4] && board[4] === board[8]) {
      answer = board[0];
    }
    if (!answer && board[2] && board[2] === board[4] && board[4] === board[6]) {
      answer = board[2];
    }

    return answer;
  }

  isGameOver() {
    return this.getWinner() || this.getPossibleMoves().length === 0;
  }

  performMove(move) {
    const { board } = this._state;
    const newBoard = [...board];
    newBoard[move.index] = move.token;

    const playerIds = Object.keys(this._state.playerInstances);
    const index0 = playerIds.indexOf(`${this._state.currentPlayerId}`);
    const index = index0 < playerIds.length - 1 ? index0 + 1 : 0;
    const nextPlayerId = playerIds[index];

    const newState = Immutable({
      ...this._state,
      board: newBoard,
      currentPlayerId: nextPlayerId,
    });

    this._state = newState;
  }
}

Object.freeze(TTTGame);

export default TTTGame;

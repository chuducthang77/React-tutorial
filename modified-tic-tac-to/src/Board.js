import React from "react";
import "./index.css";
import Square from "./Square";
import Reset from "./reset";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isX: true,
    };
  }

  aiPlay() {
    const squares = this.state.squares.slice();

    let result = minimax(this.state.squares, true);
    squares[result["index"]] = "O";

    this.setState({ squares: squares, isX: !this.state.isX });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    //Simple AI using random method
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (this.state.isX) {
      squares[i] = "X";
    } else {
      let result = alphaBeta(this.state.squares, -Infinity, Infinity, true);
      squares[result["index"]] = "O";
    }

    //Change the depth, the turn, and the board
    this.setState({ squares: squares, isX: !this.state.isX });
  }

  renderSquare(i) {
    return (
      //   <>
      //     {this.state.isX && (
      //       <Square
      //         value={this.state.squares[i]}
      //         onClick={() => this.handleClick(i)}
      //         aiTurn={() => null}
      //       />
      //     )}
      //     {!this.state.isX && (
      //       <Square
      //         value={this.state.squares[i]}
      //         onClick={() => null}
      //         aiTurn={() => this.aiPlay()}
      //       />
      //     )}
      //   </>
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = "Result: " + winner;
    } else {
      status = "Next player: " + (this.state.isX ? "X" : "O");
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div className="game-over">
          {winner && (
            <Reset
              onClick={() =>
                this.setState({ squares: Array(9).fill(null), isX: true })
              }
            />
          )}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let draw = true;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //Check if any squares is not empty
    if (!squares[i]) {
      draw = false;
    }
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  //If the game is draw or if the game is still continuing
  if (draw) {
    return "draw";
  }
  return null;
}

function minimax(squares, maximizingPlayer) {
  // Find all the empty spots left in the squares
  let empty = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      empty.push(i);
    }
  }

  //Determine whether the node is a leaf node
  if (calculateWinner(squares) === "X") {
    return { index: "leaf", value: -10, depth: 1 };
  } else if (calculateWinner(squares) === "O") {
    return { index: "leaf", value: 10, depth: 1 };
  } else if (calculateWinner(squares) === "draw") {
    return { index: "leaf", value: 0, depth: 1 };
  }

  // Append the key: value pair (position: score) in the dictionary
  let storage = [];
  for (let i = 0; i < empty.length; i++) {
    let tempSquare = squares.slice();
    if (maximizingPlayer) {
      tempSquare[empty[i]] = "O";
      let score = minimax(tempSquare, false);
      storage.push(score);
    } else {
      tempSquare[empty[i]] = "X";
      let score = minimax(tempSquare, true);
      storage.push(score);
    }
  }

  //Return the maximum value for minimizing player and minimum value for maximizing player
  var bestIdea = {};
  if (maximizingPlayer) {
    let bestScore = -Infinity;
    let bestMove = null;
    let bestDepth = Infinity;

    for (let i = 0; i < storage.length; i++) {
      if (
        storage[i]["value"] === bestScore &&
        storage[i]["depth"] < bestDepth
      ) {
        bestScore = storage[i]["value"];
        bestMove = empty[i];
        bestDepth = storage[i]["depth"] + 1;
      }
      if (storage[i]["value"] > bestScore) {
        bestScore = storage[i]["value"];
        bestMove = empty[i];
        bestDepth = storage[i]["depth"] + 1;
      }
    }
    bestIdea["index"] = bestMove;
    bestIdea["value"] = bestScore;
    bestIdea["depth"] = bestDepth;
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    let bestDepth = -Infinity;

    for (let i = 0; i < storage.length; i++) {
      if (
        storage[i]["value"] === bestScore &&
        storage[i]["depth"] > bestDepth
      ) {
        bestScore = storage[i]["value"];
        bestMove = empty[i];
        bestDepth = storage[i]["depth"] + 1;
      }
      if (storage[i]["value"] < bestScore) {
        bestScore = storage[i]["value"];
        bestMove = empty[i];
        bestDepth = storage[i]["depth"] + 1;
      }
    }
    bestIdea["index"] = bestMove;
    bestIdea["value"] = bestScore;
    bestIdea["depth"] = bestDepth;
  }
  return bestIdea;
}

function alphaBeta(squares, alpha, beta, maximizingPlayer) {
  let empty = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      empty.push(i);
    }
  }

  if (calculateWinner(squares) === "X") {
    return { index: "leaf", value: -10 };
  } else if (calculateWinner(squares) === "O") {
    return { index: "leaf", value: 10 };
  } else if (calculateWinner(squares) === "draw") {
    return { index: "leaf", value: 0 };
  }

  if (maximizingPlayer) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < empty.length; i++) {
      let result = alphaBeta(squares, alpha, beta, false);
      let temp = Math.max(bestScore, result["value"]);
      if (temp > bestScore) {
        bestScore = temp;
        bestMove = empty[i];
      }
      alpha = Math.max(alpha, bestScore);
      if (alpha >= beta) {
        break;
      }
    }
    return { index: bestMove, value: bestScore };
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    for (let i = 0; i < empty.length; i++) {
      let result = alphaBeta(squares, alpha, beta, true);
      let temp = Math.min(bestScore, result["value"]);
      if (temp < bestScore) {
        bestScore = temp;
        bestMove = empty[i];
      }
      beta = Math.min(beta, bestScore);
      if (alpha >= beta) {
        break;
      }
    }
    return { index: bestMove, value: bestScore };
  }
}

export default Board;

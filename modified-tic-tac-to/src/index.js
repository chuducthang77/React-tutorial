import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isX: true,
      depth: 9,
    };
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
      //   let number = Math.floor(Math.random() * 9)
      //   while (squares[number]) {
      //       number = Math.floor(Math.random() * 9)
      //   }
      let number = MiniMax(this.state.squares, this.state.depth, true);
      squares[number] = "O";
    }
    let num = this.state.depth
    num--
    this.setState({ squares: squares, isX: !this.state.isX,
                    depth: num});
  }

  renderSquare(i) {
    return (
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
      </div>
    );
  }
}

class Game extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {value: ''};

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  //   handleSubmit(event) {
  //     return <Board />
  //     event.preventDefault();
  //   }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        {/* <form onSubmit={this.handleSubmit}>
        <label>
          Enter the square you want to play:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
    if (!squares[i]) {
      draw = false;
    }
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (draw) {
    return "draw";
  }
  return null;
}

function MiniMax(squares, depth, maximizingPlayer) {
  
  if (depth === 0) {
    const result = calculateWinner(squares);
    if (result === "X") {
      return -1;
    } else if (result === "O") {
      return 1;
    } else if (result === "draw") {
      return 0;
    }
  }

  if (maximizingPlayer) {

    let value = -Infinity;
    let position = Array(depth).fill(null);
    let j = 0;

    //Save the position is still empty in the board
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        position[j] = i;
        j++;
      }
    }
    
    //For each position, fill in that position and calculate the value it returns
    for (let i = 0; i < position.length; i++) {
      let tempSquares = squares.slice()
      tempSquares[position[i]] = "O";
      let temp = MiniMax(tempSquares, depth - 1, false)
      value = Math.max(value, temp);
      
    }
    
  } else {
    let value = +Infinity;
    let position = Array(depth).fill(null);
    let j = 0;

    //Save the position is still empty in the board
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        position[j] = i;
        j++;
      }
    }
    //For each position, fill in that position and calculate the value it returns
    for (let i = 0; i < position; i++) {
      squares[position[i]] = "X";
      value = Math.min(value, MiniMax(squares, depth - 1, true));
      return value;
    }
  }
}

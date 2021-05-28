import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from './Board'

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
          <Board twoPlayer={false} easyBot={false}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));



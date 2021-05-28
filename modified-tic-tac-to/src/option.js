import React from "react";
import "./index.css";

class Option extends React.Component {
  render() {
    return (
      <>
        <div class="two-player">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => this.props.onClick}
          />
          <label class="form-check-label" for="flexCheckDefault">
            2 player
          </label>
        </div>
        <div class="easy-bot">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => this.props.onClick}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Easy AI
          </label>
        </div>
        <div class="hard-bot">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={() => this.props.onClick}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Difficult AI
          </label>
        </div>

        
      </>
    );
  }
}

export default Option;

import React from "react";
import "./index.css";

class Reset extends React.Component{
    render() {
        return (
            <input class="btn btn-primary" type="reset" value="Reset" onClick={() => this.props.onClick()}></input>
        )
    }
}

export default Reset
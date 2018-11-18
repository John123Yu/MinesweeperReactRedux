import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  moveBack,
  moveBackClick,
  moveForward,
  moveForwardClick
} from "../actions/index";
// import classNames from "classnames";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.undo = 0;
  }
  handleClick() {
    this.props.clickAction(this.props.row, this.props.column);
    this.props.changeClicked(this.props.row, this.props.column);
  }
  handleUndo() {
    this.props.moveBack();
    this.props.moveBackClick();
    this.undo++;
  }
  handleRedo() {
    this.props.moveForward();
    this.props.moveForwardClick();
  }
  render() {
    let score = 0;
    if (this.props.displayMap && this.props.clickedMap) {
      this.props.displayMap.forEach(row => {
        row.forEach(value => {
          if (value === 10) score -= 7;
        });
      });
      this.props.clickedMap.forEach(row => {
        row.forEach(value => {
          if (value) score++;
        });
      });
    }
    score = score - this.undo * 3;
    return (
      <div>
        <p className="score_title">Score</p>
        <div className="score_board">
          <p>{score}/206</p>
        </div>
        <div className="score_info">
          <p>*One point for tile clicked</p>
          <p>*Minus 6 points for bomb clicked</p>
          <p>*Minus 3 points for every undo</p>
          <p>Game continues despite bomb clicks</p>
          <button
            className="btn btn-danger"
            onClick={this.handleUndo.bind(this)}
          >
            Undo
          </button>
          <button
            className="btn btn-success"
            onClick={this.handleRedo.bind(this)}
          >
            Redo
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { moveBack, moveBackClick, moveForward, moveForwardClick },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);

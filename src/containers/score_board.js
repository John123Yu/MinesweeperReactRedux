import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moveBack, moveBackClick } from "../actions/index";
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
  render() {
    let score = 0;
    if (this.props.displayMap && this.props.clickedMap) {
      this.props.displayMap.forEach(row => {
        row.forEach(value => {
          if (value === 10) score -= 11;
        });
      });
      this.props.clickedMap.forEach(row => {
        row.forEach(value => {
          if (value) score++;
        });
      });
    }
    score = score - this.undo * 10;
    return (
      <div>
        <p className="score_title">Score</p>
        <div className="score_board">
          <p>{score}</p>
        </div>
        <div className="score_info">
          <p>*One point for tile clicked</p>
          <p>*Minus 10 points for bomb clicked</p>
          <p>*Minus 10 points for every undo</p>
          <p>Game continues despite bomb clicks</p>
          <button
            className="btn btn-danger"
            onClick={this.handleUndo.bind(this)}
          >
            Undo
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
  return bindActionCreators({ moveBack, moveBackClick }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);

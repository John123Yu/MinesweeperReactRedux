import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {} from "../actions/index";
// import classNames from "classnames";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.clickAction(this.props.row, this.props.column);
    this.props.changeClicked(this.props.row, this.props.column);
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
    return (
      <div>
        <p className="score_title">Score</p>
        <div className="score_board">
          <p>{score}</p>
        </div>
        <div className="score_info">
          <p>*One point for tile clicked</p>
          <p>*Minus 10 points for bomb clicked</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);

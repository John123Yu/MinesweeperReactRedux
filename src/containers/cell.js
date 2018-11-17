import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  clickAction,
  changeClicked,
  rightClick,
  gameEnd
} from "../actions/index";
import classNames from "classnames";
// import Rx from "rx";
const images = "./src/static/images";

let map_images = {
  0: "number0",
  1: "number1",
  2: "number2",
  3: "number3",
  4: "number4",
  5: "number5",
  6: "number6",
  7: "number7",
  8: "number8",
  9: "flag",
  10: "bomb"
};
class Cell extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.clickAction(this.props.row, this.props.column);
    this.props.changeClicked(this.props.row, this.props.column);
    setImmediate(() => {
      this.props.gameEnd();
    });
  }
  onContextMenu(e) {
    e.preventDefault();
    this.props.rightClick(this.props.row, this.props.column);
    setImmediate(() => {
      this.props.gameEnd();
    });
  }
  render() {
    let clicked_class = classNames({
      cell: true,
      clicked: this.props.clicked,
      not_clicked: !this.props.clicked
    });
    if (this.props.image !== undefined) {
      let top = 50 + this.props.row * 25 + "px";
      let left = 200 + 25 * this.props.column + "px";
      var divStyle = {
        backgroundImage: `url(${images}/${map_images[this.props.image]}.png)`,
        top,
        left
      };
    }
    return (
      <div
        className={clicked_class}
        style={divStyle}
        onClick={this.handleClick.bind(this)}
        onContextMenu={this.onContextMenu.bind(this)}
      />
    );
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { clickAction, changeClicked, rightClick, gameEnd },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);

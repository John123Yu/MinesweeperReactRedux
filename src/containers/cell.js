import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clickAction } from "../actions/index";
// import Rx from "rx";
const images = "./src/static/images/";

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
    console.log("HEREE");
    console.log(this.props.row);
    console.log(this.props.column);
    this.props.clickAction(this.props.row, this.props.column);
  }
  render() {
    if (this.props.display) {
      var divStyle = {
        backgroundImage: `url(${images}/${this.props.images}.png)`,
        top: this.props.row * 25 + "px",
        left: this.props.column * 25 + "px"
      };
    } else {
      var divStyle = undefined;
    }
    return (
      <div
        className="cell"
        style={divStyle}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clickAction }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initMap, initDisplay } from "../actions/index";
import Cell from "./cell";

class Map extends Component {
  constructor(props) {
    super(props);

    this.props.initMap();
    this.props.initDisplay();
  }
  renderMap() {
    console.log("PROPS ", this.props.display);
    if (!this.props.display) {
      return <div />;
    } else {
      let map = [];
      for (let i = 0; i < 3; i++) {
        map.push([]);
        for (let j = 0; j < 3; j++) {
          let image = this.props.display[i][j];
          map[i].push(
            <Cell row={i} column={j} image={image} key={Math.random()} />
          );
        }
      }
    }
    return map;
  }
  render() {
    return <div>{this.renderMap()}</div>;
  }
}

function mapStateToProps({ display }) {
  return { display };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initDisplay, initMap }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

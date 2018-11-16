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
    if (this.props.displayMap.length) {
      let row = -1;
      let column = -1;
      let map = this.props.displayMap.map((item, index) => {
        row++;
        column = -1;
        return (
          <div key={index}>
            {item.map((subitem, i) => {
              column++;
              return (
                <ul key={Math.random()} className="map_ul">
                  <Cell
                    key={Math.random()}
                    row={row}
                    column={column}
                    image={subitem.value}
                  />
                </ul>
              );
            })}
          </div>
        );
      });
      return map;
    }
  }
  render() {
    return <div>{this.renderMap()}</div>;
  }
}

function mapStateToProps({ displayMap }) {
  return { displayMap };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initDisplay, initMap }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

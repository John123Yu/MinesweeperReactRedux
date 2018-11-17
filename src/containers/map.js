import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initMap, initDisplay, initClicked } from "../actions/index";
import Cell from "./cell";
import ScoreBoard from "./score_board";

class Map extends Component {
  constructor(props) {
    super(props);

    this.props.initMap();
    this.props.initDisplay();
    this.props.initClicked();
  }
  renderMap() {
    console.log(this.props.displayMap);
    if (this.props.displayMap.length && this.props.clickedMap.length) {
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
                    image={subitem}
                    clicked={this.props.clickedMap[row][column]}
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
    return (
      <div>
        <ScoreBoard
          displayMap={this.props.displayMap}
          clickedMap={this.props.clickedMap}
        />
        {this.renderMap()}
      </div>
    );
  }
}

function mapStateToProps({ displayMap, clickedMap }) {
  return { displayMap, clickedMap };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initDisplay, initMap, initClicked }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

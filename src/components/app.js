import React, { Component } from "react";

import Map from "../containers/map";

export default class App extends Component {
  render() {
    return (
      <div>
        <h2 className="title">Minesweeper with React + Redux</h2>
        <Map />
      </div>
    );
  }
}

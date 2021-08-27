import './App.css';
import { createGradient } from "./util"
import React, { Component } from 'react'
import NavBar from "./view/NavBar.jsx"
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: ["主页", "我的"]
    }
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    let ctx = this.canvasRef.current.getContext("2d")
    ctx.font = "72px Arial";
    ctx.fillStyle = createGradient(ctx, { x: 0, y: 0 }, { x: 0, y: 72 }, "red", "green");
    ctx.fillText("web源", 16, 80)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <canvas width="240px" height="120px" style={{
            width: '120px',
            height: '60px'
          }} ref={this.canvasRef}>
          </canvas>
        </header>
        <div>
          <NavBar navList={this.state.navList} history={history}>
          </NavBar>
        </div>
      </div>
    )
  }
}



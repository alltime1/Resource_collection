import React, { Component } from 'react'
import Recommend from "../components/recommend"
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import style from "./Main.module.css";
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabList: [
        '推荐',
      ]
    }
  }
  render() {
    return (
      <div className={style.main}> <BrowserRouter >

        <ul style={{
          padding:"3px 0"
        }} >
          {this.state.tabList.map(e => {
            return (
              <li key={e}>
                <Link className={style.article} to="/main/recommend"> {e}</Link>
              </li>
            )
          })}

        </ul>
        <div style={{flex:1}}>
          <Route path="/main/recommend" component={Recommend}></Route>
        </div></BrowserRouter>

      </div>
    )
  }
}

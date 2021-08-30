import React, { Component } from 'react'
import Recommend from "../components/recommend"
import Vues from "../components/Vues"
import Reacts from "../components/Reacts"
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import style from "./Main.module.css";
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabList: [
        {
          name: '推荐',
          link: "/main/recommend"
        },
        {
          name: 'Vue',
          link: "/main/vue"
        },
        {
          name: 'react',
          link: "/main/react"
        },
        //  getMineSpareList
      ]
    }
  }
  userAdd(){

  }
  render() {
    return (
      <div className={style.main}> <BrowserRouter >

        <ul style={{
          padding: "3px 0"
        }} >
          {this.state.tabList.map(e => {
            return (
              <li key={e.name}>
                <Link className={style.article} to={e.link}> {e.name}</Link>
              </li>
            )
          })}
          {/* <li onClick={()=>{this.userAdd()}}>
          <svg t="1630144020717" className="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2145" width="60" height="50"><path d="M825.82 199.025C741.931 115.544 630.434 69.566 511.806 69.566S281.64 115.544 197.744 199.024 67.6 393.614 67.6 511.766s46.225 229.24 130.143 312.75 195.394 129.458 314.033 129.458 230.155-45.928 314.013-129.457 130.143-194.63 130.143-312.781-46.156-229.201-130.114-312.711z m-91.916 344.472H543.537v190.377c0 17.524-14.206 31.731-31.73 31.731s-31.731-14.207-31.731-31.73V543.496H289.698c-17.524 0-31.73-14.206-31.73-31.73s14.206-31.731 31.73-31.731h190.377V289.667c0-17.524 14.206-31.73 31.73-31.73 17.526 0 31.731 14.206 31.731 31.73v190.377h190.367c17.524 0 31.73 14.207 31.73 31.73s-14.206 31.732-31.73 31.732v-0.009z" fill="#d81e06" p-id="2146" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
          </li> */}
        </ul>
        <div style={{ flex: 1 }}>
          <Redirect from="/main" to="/main/recommend"></Redirect>
          <Route path="/main/recommend" component={Recommend}></Route>
          <Route path="/main/vue" component={Vues}></Route>
          <Route path="/main/react" component={Reacts}></Route>
        </div>
        </BrowserRouter>

      </div>
    )
  }
}

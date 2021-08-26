import React, { Component } from 'react'
import style from "./NavBar.module.css"
import { Link} from 'react-router-dom';
export default class main extends Component {
  constructor(props) {
    super(props)
    this.changeRouter = this.changeRouter.bind(this)
    this.state = {
      choosedNav: 0,
    }
  }
  componentDidMount(){
    if(this.props.history.location.pathname=="/mine"){
      this.setState({
        choosedNav:1
       })
    }
  }
   changeRouter(i) {
     this.setState({
      choosedNav:i
     })
  }
  render() {
    return (
      <div className={style.navBottom}>
        
        {this.props.navList.map((ele, i) => {
          return (
            <Link key={ele} className={style.link} onClick={()=>this.changeRouter(i)} to={i===0?"/main":"/mine"} >
              {ele === "主页" ? <svg t="1629957004675" className={style.icon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1200" data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200"><path d="M997.3 456.4l-419-428.5c-36.4-37.3-96.1-37.3-132.5 0l-419 428.5c-57 58.3-16.6 158 64 158h62.9v307.2c0 56.6 45.8 102.4 102.4 102.4h153.6V768c0-28.3 22.9-51.2 51.2-51.2h102.4c28.3 0 51.2 22.9 51.2 51.2v256H768c56.6 0 102.4-45.8 102.4-102.4V614.4h62.9c80.6 0 121-99.7 64-158z" fill={this.state.choosedNav === 0 ? "#d81e06" : "#777"} p-id="1201"></path></svg> : ""}
              {ele === "我的" ? <svg t="1629957344422" className={style.icon2} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2166" width="200" height="200"><path d="M512 64l248.9 0 0 248.9c0 137.5-111.4 248.9-248.9 248.9S263.1 450.4 263.1 312.9 374.5 64 512 64zM288 611.6l448 0c96.2 0 174.2 78 174.2 174.2l0 24.9c0 82.5-66.9 149.3-149.3 149.3L263.1 960c-82.5 0-149.3-66.9-149.3-149.3l0-24.9c-0.1-96.2 77.9-174.2 174.2-174.2z" fill={this.state.choosedNav === 1 ? "#d81e06" : "#ddd"} p-id="2167"></path></svg> : ""}
              <p style={{
                color: this.state.choosedNav === i ? "#d81e06" : "#777"
              }
              }>{ele}</p>
            </Link>
          )
        })}

        {this.props.children}
      </div>
    )
  }
}

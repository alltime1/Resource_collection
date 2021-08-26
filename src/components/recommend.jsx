import React, { Component, createRef } from 'react'
import style from "./recommend.module.css"
export default class Mine extends Component {
  constructor(props) {
 
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      bookList: [
        {
          img: "https://static.sitestack.cn/static/images/logo.png",
          text: "书栈网 · BookStack_程序员IT互联网开源编程书籍免费阅读与下载，取之于猿用之于猿",
          path:"https://www.bookstack.cn/"
        },{
          img: "https://github.githubassets.com/pinned-octocat.svg",
          text: "GitHub",
          path:"https://github.com"
          
        }
      ]
    }
  }
  componentDidMount(){
     console.log(this.canvasRef.current.getElementsByTagName("canvas"))
     for(let i=0;i<this.state.bookList.length;i++){
      console.log(this.canvasRef.current.getElementsByTagName("canvas")[i])   
     }
     
  }
  render() {
    return (
      <div className={style.book_list} ref={this.canvasRef} >
        {this.state.bookList.map(e => {
          return (
            <div key={e.text} onClick={()=>{window.open(e.path)}}  className={style.book_list_one}>
              <canvas width="100px" height="100px">
                {/* <img src={e.img}></img> */}
              </canvas>
              
              <p>{e.text}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

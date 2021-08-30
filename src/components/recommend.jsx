import React, { Component, createRef } from 'react'
import style from "./recommend.module.css"
import axios from "axios"
import { Tooltip } from 'antd';
import { Input } from 'antd';
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import { Select } from 'antd';
import { Alert } from 'antd';

import { createGradient } from "../util"
const { Search } = Input;
const { Option } = Select;
export default class Mine extends Component {
  constructor(props) {
    
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      loading: false,
      failPath:false,
      sitePath: "",
      siteMsg: "",
      sitePic: "",
      disabled: true,
      tip: "公开网址，将进入审核状态，审核成功后，网站将被收录！",
      visible: false,
      // 云服务安装mysql   https://blog.csdn.net/qq_40241957/article/details/90343651
      bookList: [
        {
          icon: "http://1.116.252.29/logo.png",
          title: "书栈网 · BookStack_程序员IT互联网开源编程书籍免费阅读与下载，取之于猿用之于猿",
          url: "https://www.bookstack.cn/"
        }, {
          icon: "http://1.116.252.29/pinned-octocat.svg",
          title: "GitHub",
          url: "https://github.com"
        }, {
          icon: "http://1.116.252.29/juejin.svg",
          title: "掘金",
          url: "https://juejin.cn/"
        }, {
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
          title: "react 中文文档",
          url: "https://react.docschina.org/"
        }, {
          icon: "http://1.116.252.29/vLogo.svg",
          title: "vue 中文文档",
          url: "https://cn.vuejs.org/"
        }, {
          icon: "http://1.116.252.29/angularL.svg",
          title: "angular 官方文档",
          url: "https://angular.io/"

        }
      ]
    }
  }
  componentDidMount() {
    axios.get("http://1.116.252.29:3999/api/getList").then(e => {
      if (e.status == 200) {
        let bookList = this.state.bookList
        bookList = [...bookList, ...e.data]
        this.setState({
          bookList: bookList
        })
        this.canvasDraw()
      }
    }).catch(e => {

      this.canvasDraw()
    })

  }
  failUrl() {
    this.setState({
      failPath:true
    }, this.onChangeDisable);
  }
  blurUrl(url) {
    this.setState({
      failPath:false
    })
    if (url.slice(0, 7) !== "http://" && url.slice(0, 8) !== "https://") {
      url = "https://" + url
    }
    let that = this;
    var xmlhttp;
    if (window.ActiveXObject) {
      xmlhttp = new window.ActiveXObject()
    } else {
      xmlhttp = new window.XMLHttpRequest()
    }
    try {
      xmlhttp.open("GET", url, true)
      xmlhttp.send()
    } catch (error) {
      that.setState({
        failPath:true
      })
    }


    xmlhttp.onreadystatechange = function () {
      console.log(xmlhttp.readyState, xmlhttp.status)
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
           that.onChangeDisable()
        } else {

          that.failUrl()
        }
      } else {
        that.failUrl()
      }
    }
    xmlhttp.onerror = function (e) {
      console.log(e)
    }
  }
  canvasDraw() {
    for (let i = 0; i < this.state.bookList.length; i++) {
      let ctx = this.canvasRef.current.getElementsByTagName("canvas")[i].getContext('2d')
      ctx.rect(10, 10, 80, 80)
      let createImg = new Image();
      createImg.src = this.state.bookList[i].icon;
      let height = 200;
      let width = 200;
      createImg.onerror = () => {
        createImg.src = `data:image/png;base64,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`
        if (createImg.height > createImg.width) {
          createImg.style.height = "200" + "px";
          width = createImg.width / (createImg.height / 200)
          createImg.style.width = "auto"
        } else {
          createImg.style.width = "200" + "px";
          height = createImg.height / (createImg.width / 200)
          createImg.style.height = "auto"
        }
        this.createCanvas(createImg, width, height, ctx)
        return
      };

      createImg.onload = () => {
        if (createImg.height > createImg.width) {
          createImg.style.height = "200" + "px";
          width = createImg.width / (createImg.height / 200)
          createImg.style.width = "auto"
        } else {
          createImg.style.width = "200" + "px";
          height = createImg.height / (createImg.width / 200)
          createImg.style.height = "auto"
        }
        this.createCanvas(createImg, width, height, ctx)
      }
    }
  }
  createCanvas(createImg, width, height, ctx) {
    ctx.drawImage(createImg, (200 - width) / 2, (200 - height) / 2, width, height)
    var cData;
    try {
      cData = ctx.getImageData((200 - width) / 2, (200 - height) / 2, width, height);
      for (let i = 0; i < cData.data.length; i += 4) {
        if (cData.data[i] == 0 && cData.data[i + 1] == 0 && cData.data[i + 2] == 0 && cData.data[i + 3] == 0) { } else {
          console.log(cData.data[i], cData.data[i + 1], cData.data[i + 2], cData.data[i + 3])
          var color = cData.data[i] + "," + cData.data[i + 1] + "," + cData.data[i + 2] + "," + cData.data[i + 3]
          break;
        }
      }

      ctx.rect(0, 0, 200, 200)
      ctx.fillStyle = `rgba(${color.split(",")[0]},${color.split(",")[1]},${color.split(",")[2]},${color.split(",")[3]})`
      ctx.fill()
      ctx.putImageData(cData, (200 - width) / 2, (200 - height) / 2);
    } catch (error) {
      // cData = ctx.getImageData((200 - width) / 2, (200 - height) / 2, width, height);
    }


  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      loading: false
    });
    this.clear()
    
  };
  handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value == "public") {
      this.setState({
        tip: "公开网址，将进入审核状态，审核成功后，网址将被收录！",
      })
    } else {
      this.setState({
        tip: "网址信息将仅供个人使用（数据将存入个人的数据库）"
      })
    }
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      loading: false
    });
    this.clear()
  };
  addList = () => {
    this.setState({
      visible: true,
    });
  }
  handleChangePic = (e) => {
    this.setState({
      sitePic: e.target.value,
    }, this.onChangeDisable)

  }
  handleChangeMsg = (e) => {
    this.setState({
      siteMsg: e.target.value
    }, this.onChangeDisable)
  }
  clear(){
   this.setState({
    sitePath: "",
    siteMsg: "",
    sitePic: "",
   })
  }
  handleChangePath = (e) => {
    this.setState({
      sitePath: e.target.value,
      failPath:false
    },
      this.onChangeDisable

    )
  }
  blur = (e) => {
    if (this.state.sitePic == "") {
      this.setState({
        errImg: false,
      }); return
    }
    this.setState({
      loading: true
    })
    let img = new Image()
    console.log(this.state.loading)
    img.onerror = () => {
      this.setState({
        errImg: true,
        loading: false,
      })
    }
    img.onload = () => {
      this.setState({
        sitePic: e,
        loading: false,
        errImg: false
      })
    }
    img.src = e
  }
  onChangeDisable = (e) => {
    console.log(this.state.sitePic)
    if (this.state.sitePic == "") {
     
      this.setState({
        loading: false,
        errImg: false,
        disabled:true,
      })
      return
    }
    if (this.state.sitePic != "" && this.state.siteMsg != "" && this.state.sitePath != "") {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }
  render() {
    return (
      <div className={style.book_list} ref={this.canvasRef} >
        <div className={style.book_list_a}>
          {this.state.bookList.map((e, i) => {
            return (
              <Tooltip placement="top" title={e.url} key={e.title}>
                <div onClick={() => { window.open(e.url) }} className={style.book_list_one}>
                  <canvas width="200px" height="200px" style={{
                    border: "1px solid #ddd",
                    width: "100px",
                    height: "100px",
                    background: "#fff",
                  }}>
                    <img src={e.icon} alt={e.title}></img>
                  </canvas>
                  <p>{e.title}</p>
                </div>
              </Tooltip>
            )
          })}
          <div>

            <svg t="1630308723116" onClick={this.addList} style={{
              marginBottom: "20px"
            }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9008" width="100" height="100"><path d="M512 0c282.772211 0 512 229.227789 512 512s-229.227789 512-512 512S0 794.772211 0 512 229.227789 0 512 0z m0 256a40.421053 40.421053 0 0 0-40.421053 40.421053v175.157894H296.421053a40.421053 40.421053 0 1 0 0 80.842106h175.157894v175.157894a40.421053 40.421053 0 0 0 80.842106 0V552.421053h175.157894a40.421053 40.421053 0 0 0 0-80.842106l-175.157894-0.006736V296.421053a40.421053 40.421053 0 0 0-40.421053-40.421053z" fill="rgb(216, 30, 6)" p-id="9009"></path><path d="M870.575158 279.511579a411.728842 411.728842 0 0 1 29.925053 51.914105c5.443368 11.277474 0.606316 24.778105-10.819369 30.154105-11.418947 5.376-25.088 0.592842-30.531368-10.677894a364.490105 364.490105 0 0 0-26.644211-46.221474 22.447158 22.447158 0 0 1 6.292211-31.38021c10.509474-6.952421 24.737684-4.170105 31.777684 6.211368z m-185.19579-156.456421a417.616842 417.616842 0 0 1 72.744421 39.626105 424.434526 424.434526 0 0 1 63.750737 53.274948 23.740632 23.740632 0 0 1 0 33.17221 22.790737 22.790737 0 0 1-32.606315 0 378.138947 378.138947 0 0 0-56.805053-47.461053 371.738947 371.738947 0 0 0-64.754526-35.274105c-11.769263-4.958316-17.347368-18.681263-12.469895-30.652631 4.877474-11.964632 18.371368-17.650526 30.133895-12.685474z" fill="#FFFFFF" p-id="9010"></path></svg>
          </div>

        </div>
        <Modal
          title="添加网址"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          type="dashed"
          okButtonProps={{ disabled: this.state.disabled }}
        >
          {/* <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p> */}
          <Search style={{
            marginTop: "14px",
            // textDecoration: this.state.errImg && "line-through",
          }} className={"ant-input",this.state.errImg?style.errImg:""} placeholder="请输入网站图片" onBlur={() => this.blur(this.state.sitePic)} onChange={this.handleChangePic} loading={this.state.loading} prefix={(this.state.errImg ? <FrownTwoTone /> : <SmileTwoTone />)} />
          <Input style={{
            marginTop: "14px"
          }} placeholder="请输入网址信息" onChange={this.handleChangeMsg} />
          <Input className={"ant-input",this.state.failPath&&style.waring} style={{
            marginTop: "14px"
          }} placeholder="请输入网址路径" onBlur={() => this.blurUrl(this.state.sitePath)} onChange={this.handleChangePath} />
          <Select defaultValue="public" style={{ width: 120, marginTop: "14px" }} onChange={this.handleChange}>
            <Option value="public">公开</Option>
            <Option value="private">私有</Option>
          </Select>
          <Alert style={{
            marginTop: "14px"
          }} message={this.state.tip} type="info" showIcon />
        </Modal>
      </div>
    )
  }
}

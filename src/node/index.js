const http = require('http')
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods","*")
  res.writeHead(200,{'Content-Type':"text/plain;charset=utf-8"})
  // res.statusCode = 200;
  res.write("你好")
  res.end()
}).listen("2000")
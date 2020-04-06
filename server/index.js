const express = require('express')
const Vue = require('vue')

// 创建 express 实例
const app = express()

// 创建 vue 实例
const vm = new Vue({
  data: { cnt: 1 },
  template: `
    <div>{{cnt}}</div>
  `,
})

// 创建渲染器
const renderer = require('vue-server-renderer').createRenderer()

// 声明服务端路由
app.get('*', async function (req, res) {
  try {
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('渲染服务器启动成功')
})

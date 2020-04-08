const express = require('express')
const Vue = require('vue')
const fs = require('fs')

// 创建 express 实例
const app = express()

const { createBundleRenderer } = require('vue-server-renderer')

const bundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/server/vue-ssr-client-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync('./src/index.temp.html'),
  clientManifest: clientManifest,
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
        return
      }
      resolve(html)
    })
  })
}

// // 创建 vue 实例
// const vm = new Vue({
//   data: { cnt: 1 },
//   template: `
//     <div>{{cnt}}</div>
//   `,
// })


app.use(express.static('../dist/client'))
// 声明服务端路由
app.get('*', async function (req, res) {
  try {
    const context = {
      title: 'ssr test',
      url: req.url,
    }
    const html = await renderToString(context)
    res.send(html)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('渲染服务器启动成功')
})

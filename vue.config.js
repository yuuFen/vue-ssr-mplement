// 导入两个 webpack 插件，分别负责生成服务端和客户端 bundle
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// 优化策略
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
// 根据 WEBPACK_TARGET 环境变量做相应输出
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  css: {
    extract: false,
  },
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // 这允许 webpack 以 Node 适用方式处理动态导入（dynamic import）
    // 并且会在编译 Vue 组件时告知 vue-loader 输送面向服务器的代码（server-orientedcode）
    target: TARGET_NODE ? 'node' : 'web',
    // 打包时处理一些 node 中特有的全局变量，如 mock
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处告知 server bundle 使用 Node 风格导出模块
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    // 外置化应用程序依赖模块
    // 可以使服务器构建速度更快，并生成较小的 bundle 文件
    externals: TARGET_NODE
      ? nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块
          // 可以在这里添加更多的文件类型。例如未处理的 *.vue 原始文件
          // 还应该将修改 'global'（如 polyfill）的依赖模块列入白名单
          whitelist: [/\.css$/],
        })
      : undefined,
    optimization: {
      splitChunks: undefined,
    },
    // 这个插件可以将服务器的整个输出，构建为单个 json 文件
    // 服务端默认文件名为 vue-ssr-server-bundle.json
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
  }),
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        merge(options, {
          optimizeSSR: false,
        })
      })
  },
}

import {} from './app'

export default (context) => {
  // 返回 Promise，确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    // 创建 vue 实例
    const { app, router } = createApp(context)
    // 跳转首屏地址
    router.push(context.url)
    // 完成 promise
    router.onReady(
      () => {
        resolve(app)
      },
      // error handler
      reject
    )
  })
}

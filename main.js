import { createApp } from "./src/runtime-canvas"
import App from "./src/App"
import { getRootContainer } from "./src/Game"

// 使用根组件创建 App
// 挂载至根容器上
// 挂载至 pixi.js Application 的容器上
createApp(App).mount(getRootContainer())

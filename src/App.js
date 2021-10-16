// 根组件 src/App.js
import { defineComponent, h } from '@vue/runtime-core'
import Circle from './component/Circle'

export default defineComponent({
  render() {
    // 使用 h 函数创建虚拟节点
    const vnode = h("rect", {
      x: 80,
      y: 20
    }, [
      "这是个不起眼的矩形，但也是这里的第一个矩形",
      h(Circle)
    ])
    // console.log(vnode)
    return vnode
  }
})
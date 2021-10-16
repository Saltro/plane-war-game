import { defineComponent, h } from '@vue/runtime-core'

export default defineComponent({
  render() {
    const vnode = h("circle", {
      x: 10,
      y: 30
    }, "这是一个圆组件")
    return vnode
  }
})
import { defineComponent, h, toRefs } from "@vue/runtime-core"
import planeImg from '../../assets/plane.png'

export default defineComponent({
  // 设置 props 不然 setup 中的 props 没有值
  props: {
    x: Number,
    y: Number,
  },
  setup(props, ctx) {
    // props 只读
    // 响应式丢失
    const {x, y} = toRefs(props)

    window.addEventListener("keydown", e => {
      if (e.code === "Space") {
        ctx.emit("attack", {
          x: x.value,
          y: y.value
        })
      }
    })
    
    return {
      x,
      y
    }
  },
  render(ctx) {
    return h("Container", {
      x: ctx.x,
      y: ctx.y
    }, [
      h("Sprite", {
        texture: planeImg
      })
    ])
  }
})
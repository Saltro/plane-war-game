import { defineComponent, h, toRefs } from "@vue/runtime-core"
import bulletImg from '../../assets/bunny-self.png'

export default defineComponent({
  setup(props, ctx) {
    // props 只读
    // 响应式丢失

    const {x, y} = toRefs(props)
    
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
        texture: bulletImg
      })
    ])
  }
})
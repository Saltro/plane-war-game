import { defineComponent, h } from "@vue/runtime-core"
import endPageImg from '../../assets/end_page.jpg'
import restartBtnImg from '../../assets/restartBtn.png'

export default defineComponent({
  // vue3 入口函数
  setup(props, ctx) {
    const onClick = () => {
      console.log('click')
      ctx.emit('changePage', 'GamePage')
    }
    return {
      onClick
    }
  },
  render(ctx) {
    // 创建背景图片
    // pixi.js
    return h("Container", [
      h("Sprite", {
        texture: endPageImg
      }),
      h("Sprite", {
        texture: restartBtnImg,
        x: 228,
        y: 515,
        interactive: true,
        onClick: ctx.onClick
      })
    ])
  }
})
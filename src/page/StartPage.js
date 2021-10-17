import { defineComponent, h } from "@vue/runtime-core"
import startPageImg from '../../assets/start_page.jpg'
import startBtnImg from '../../assets/startBtn.png'

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
        texture: startPageImg
      }),
      h("Sprite", {
        texture: startBtnImg,
        x: 228,
        y: 515,
        interactive: true,
        onClick: ctx.onClick
      })
    ])
  }
})
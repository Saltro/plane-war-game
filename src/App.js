// 根组件 src/App.js
import { defineComponent, h, computed, ref } from '@vue/runtime-core'
import StartPage from './page/StartPage'
import GamePage from './page/GamePage'
import EndPage from './page/EndPage'

export default defineComponent({
  setup() {
    // curPageName = 'StartPage' 时 curPageName 没有响应式，改变时也无法触发 computed
    // 使用 ref 将值类型变成响应式对象
    const curPageName = ref('StartPage')
    // 当改变 curPage 时切换组件
    const curPage = computed(() => {
      switch (curPageName.value) {
        case 'StartPage':
          return StartPage
        case 'GamePage':
          return GamePage
        case 'EndPage':
          return EndPage
        default:
          return StartPage
      }
    })
    return {
      curPageName,
      curPage
    }
  },
  render(ctx) {
    // 使用 h 函数创建虚拟节点
    const vnode = h("Container", [
      h(ctx.curPage, {
        onChangePage(page) {
          console.log('change to ' + page)
          ctx.curPageName = page
        }
      })
    ])
    // console.log(vnode)
    return vnode
  }
})
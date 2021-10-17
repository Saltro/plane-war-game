import { defineComponent, h, reactive, onMounted, onUnmounted } from "@vue/runtime-core"
import { game } from '../Game'
import Map from "../component/Map"
import Plane from "../component/Plane"
import Enemy from "../component/Enemy"
import { hitTestObject } from "../utils"

export default defineComponent({
  setup(props, ctx) {
    const planeInfo = usePlaneInfo()

    const enemies = useEnemies()

    const gamePageLoop = () => {
      // 游戏主循环
      // 随机移动飞机
      enemies.forEach(info => {
        info.y++
      })

      // 碰撞检测（矩形碰撞）
      enemies.forEach(info => {
        if (hitTestObject(info, planeInfo)) {
          // 碰撞后游戏结束
          ctx.emit('changePage', 'EndPage')
        }
      })
    }

    onMounted(() => {
      game.ticker.add(gamePageLoop)
    })

    // 销毁时取消循环
    onUnmounted(() => {
      game.ticker.remove(gamePageLoop)
    })

    return {
      planeInfo,
      enemies
    }
  },
  render(ctx) {
    // 创建敌机
    const createEnemies = () => {
      return ctx.enemies.map(info => {
        return h(Enemy, {
          x: info.x,
          y: info.y
        })
      })
    }

    // 创建背景图片
    // pixi.js
    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y
      }),
      ...createEnemies()
    ])
  }
})

function usePlaneInfo() {
  // 使用 reactive 将对象变为响应式对象
  const planeInfo = reactive({
    x: 250,
    y: 600,
    width: 258,
    height: 364
  })

  const speed = 16
  window.addEventListener("keydown", (e) => {
    // console.log(e)
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y -= speed
        break
      case 'ArrowDown':
        planeInfo.y += speed
        break
      case 'ArrowLeft':
        planeInfo.x -= speed
        break
      case 'ArrowRight':
        planeInfo.x += speed
        break
    }
  })

  return planeInfo
}

function useEnemies() {
  const width = 308
  const height = 207
  const enemies = reactive([{
    x: 0,
    y: 0,
    width,
    height
  }])

  return enemies
}
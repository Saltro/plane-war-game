import { defineComponent, h, reactive, onMounted, onUnmounted } from "@vue/runtime-core"
import { game } from '../Game'
import Map from "../component/Map"
import Plane from "../component/Plane"
import Enemy from "../component/Enemy"
import Bullet from '../component/Bullet'
import { hitTestObject } from "../utils"

export default defineComponent({
  setup(props, ctx) {
    const planeInfo = usePlaneInfo()

    const enemies = useEnemies()

    const { bullets, addBullet } = useBullets()

    const onAttack = bulletInfo => {
      addBullet(bulletInfo)
    }

    useFighting(ctx.emit, planeInfo, bullets, enemies)

    return {
      planeInfo,
      enemies,
      bullets,
      onAttack
    }
  },
  render(ctx) {
    // 根据 enemies 创建敌机
    const createEnemies = () => {
      return ctx.enemies.map(info => {
        return h(Enemy, {
          x: info.x,
          y: info.y
        })
      })
    }

    // 根据 bullets 创建子弹
    const createBullets = () => {
      return ctx.bullets.map(info => {
        return h(Bullet, {
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
        y: ctx.planeInfo.y,
        onAttack: ctx.onAttack
      }),
      ...createEnemies(),
      ...createBullets()
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

  const SPEED = 16
  window.addEventListener("keydown", (e) => {
    // console.log(e)
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y -= SPEED
        break
      case 'ArrowDown':
        planeInfo.y += SPEED
        break
      case 'ArrowLeft':
        planeInfo.x -= SPEED
        break
      case 'ArrowRight':
        planeInfo.x += SPEED
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

function useBullets() {
  const bullets = reactive([])

  const addBullet = bulletInfo => {
    bullets.push({
      x: bulletInfo.x + 100,
      y: bulletInfo.y,
      width: 61,
      height: 99
    })
  }

  return {
    bullets,
    addBullet
  }
}

function useFighting(emit, planeInfo, bullets, enemies) {
  const BULLET_SPEED = 5
  const ENEMY_SPEED = 1
  
  // 游戏主循环
  const gamePageLoop = () => {
    // 随机移动飞机
    enemies.forEach(info => {
      info.y += ENEMY_SPEED
    })

    // 向上移动子弹
    bullets.forEach(info => {
      info.y -= BULLET_SPEED
    })

    // 碰撞检测（矩形碰撞）
    // 我方飞机和敌人撞到
    enemies.forEach(info => {
      if (hitTestObject(info, planeInfo)) {
        // 碰撞后游戏结束
        emit('changePage', 'EndPage')
      }
    })
    // 子弹和敌方飞机碰撞
    bullets.forEach((bulletInfo, bulletIndex) => {
      enemies.forEach((enemyInfo, enemyIndex) => {
        if (hitTestObject(bulletInfo, enemyInfo)) {
          bullets.splice(bulletIndex, 1)
          enemies.splice(enemyIndex, 1)
        }
      })
    })
  }

  onMounted(() => {
    game.ticker.add(gamePageLoop)
  })

  // 销毁时取消循环
  onUnmounted(() => {
    game.ticker.remove(gamePageLoop)
  })
}
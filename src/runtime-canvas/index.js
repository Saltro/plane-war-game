import { createRenderer } from '@vue/runtime-core'
import { Graphics, Text } from 'pixi.js'

const render = createRenderer({
  createElement(type) {
    console.log(type)

    // pixi.js
    let element
    switch (type) {
      case 'rect':
        element = new Graphics()
        element.beginFill(0xff00ff)
        element.drawRect(0, 0, 200, 300)
        element.endFill()
        break
      case 'circle':
        element = new Graphics()
        element.beginFill(0x00ffff)
        element.drawCircle(0, 0, 40)
        element.endFill()
    }

    return element
  },
  patchProp(el, key, prevValue, nextValue) {
    el[key] = nextValue
  },
  setElementText(node, text) {
    const t = new Text(text)
    node.addChild(t)
  },
  createText(text) {
    return new Text(text)
  },
  insert(el, parent) {
    // console.log(el, parent)
    parent.addChild(el)
  }
})

export function createApp(rootComponent) {
  return render.createApp(rootComponent)
}
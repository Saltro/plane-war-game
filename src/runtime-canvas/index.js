import { createRenderer } from '@vue/runtime-core'
import { Text, Container, Sprite, Texture } from 'pixi.js'

const render = createRenderer({
  createElement(type) {
    // console.log(type)

    // pixi.js
    let element
    switch (type) {
      case 'Container':
        element = new Container()
        break
      case 'Sprite':
        element = new Sprite()
    }

    return element
  },
  patchProp(el, key, prevValue, nextValue) {
    // pixi.js
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue)
        break
      case 'onClick':
        el.on('pointertap', nextValue)
        break
      default:
        el[key] = nextValue
    }
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
  },
  createComment() {},
  parentNode() {},
  nextSibling() {},
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  }
})

export function createApp(rootComponent) {
  return render.createApp(rootComponent)
}
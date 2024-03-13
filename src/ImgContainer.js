import {clearElementContent} from "./helpers.js";

export class ImgContainer{
  #element = null

  constructor(element) {
    this.#element = element
  }

  add(element){
    if(this.#element) {
      this.#element.appendChild(element)
    }
  }

  createWarning(text){
    const warning = document.createElement('h1')
    warning.textContent = text

    this.add(warning)
  }

  createImg(src){
    const img = document.createElement('img')
    img.src = src

    this.add(img)
  }

  #createWaiting(){
    const waiting = document.createElement('h1')
    waiting.textContent = '.'
    waiting.classList.add('waiting', 'overlay-element')

    const interval = setInterval(() => {
      if(!waiting.offsetWidth){
        clearInterval(interval)
      }

      waiting.textContent.length < 3 ? waiting.textContent += '.' : waiting.textContent = '.'
    }, 1000)

    this.add(waiting)
  }

  clear(){
    if(this.#element){
      const img = this.#element.querySelector('img')
      if(img && img.src){
        URL.revokeObjectURL(img.src)
      }
      clearElementContent(this.#element)
    }
  }

  setOpacity(opacity){
    Array.from(this.#element.children).forEach(element => element.style.opacity = opacity)
  }

  wait(){
    const elements = Array.from(this.#element.getElementsByClassName('waiting'))
    elements.forEach(element => element.remove())

    this.#createWaiting()
  }
}
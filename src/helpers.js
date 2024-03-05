export function toggleElementInteraction(element, force){
  if(force !== undefined){
    element.disabled = force
    return
  }

  element.disabled = !element.disabled
}

export function addEventListeners(elements, type, listener){
  elements = Array.isArray(elements) ? elements : [elements]
  elements.forEach(() => addEventListener(type, listener))
}

export function clearElementContent(element){
  element.innerHTML = ''
}

export function setBackgroundColorRgb(element, rgb){
  const [red, green, blue] = rgb

  element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

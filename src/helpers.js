export function toggleElementInteraction(element, force){
  element.disabled = force !== undefined ? force : !element.disabled
}

export function addEventListeners(elements, type, listener){
  elements = Array.isArray(elements) ? elements : [elements]
  elements.forEach(element => element.addEventListener(type, listener))
}

export function clearElementContent(element){
  element.innerHTML = ''
}

export function setBackgroundColorRgb(element, [red, green, blue]){
  element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}
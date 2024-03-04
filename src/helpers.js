export function setElementOpacity(elements, opacityRate){
  if(!elements.length){
    return
  }

  const elementsArr = Array.isArray(elements) ? elements : [elements]
  elementsArr.forEach(element => element.style.opacity = opacityRate)
}

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

export function createChildElement(baseElement, childTag){
  const element = document.createElement(childTag)
  baseElement.appendChild(element)

  return element
}

export function setChildrenOpacity(element, opacity){
  setElementOpacity(Array.from(element.childNodes), opacity)
}

function addFilterApi(filter){
  let filterOptions = `?filter=${filter}`

  if(filter === 'custom'){
    const {sliderRed, sliderGreen, sliderBlue} = slidersFilter
    filterOptions += `&r=${sliderRed.value}&g=${sliderGreen.value}&b=${sliderBlue.value}`
  }

  return filterOptions
}

function addGifApi(){
  return '/gif'
}

function addTextContentApi(textContent){
  return `/says/${textContent}`
}

function addTagApi(tag){
  return `/${tag}`
}
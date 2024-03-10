export function toggleElementInteraction(element, force){
  element.disabled = force !== undefined ? force : !element.disabled
}

export function addEventListeners(elements, type, listener){
  const elementsArray = Array.isArray(elements) ? elements : [elements]
  elementsArray.forEach(element => element.addEventListener(type, listener))
}

export function clearElementContent(element){
  element.innerHTML = ''
}

export function setBackgroundColorRgb(element, [red, green, blue]){
  element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

export function copyObject(object){
  return new object.constructor(object)
}

export function getObjectValuesByKey(object, key){
  return Object.values(object).map(item => item[key])
}

export async function requestImg(url){
  const response = await fetch(url)

  if(!response.ok){
    return null
  }

  const blobImg = await response.blob()

  return URL.createObjectURL(blobImg)
}
const inputImgTag = document.getElementById('input-tag')
const inputImgText = document.getElementById('input-text')
const buttonGenerate = document.getElementById('button-request')
const imgContainer = document.getElementById('img-area')
const checkBoxIsGif = document.getElementById('is-gif')
const selectFilter = document.getElementById('select-filter')
const colorFilterPreview = document.getElementById('filter-preview')


const slidersFilter = {
  sliderRed: document.getElementById('input-red'),
  sliderGreen: document.getElementById('input-green'),
  sliderBlue: document.getElementById('input-blue'),
}

handleFiltersSlide(colorFilterPreview)
addEventListeners(Object.values(slidersFilter), 'input',() => handleFiltersSlide(colorFilterPreview))
selectFilter.addEventListener('change', handleSelectFilterOption)
buttonGenerate.addEventListener('click', generateImg)

async function requestImg(url){
  const response = await fetch(url)
  if(!response.ok){
    return null
  }

  const blobImg = await response.blob()

  return URL.createObjectURL(blobImg)
}

async function generateImg(){
  const getUrlProps = {
    tag: inputImgTag.value,
    textContent: inputImgText.value,
    isGif: checkBoxIsGif.checked,
    filter: selectFilter.value,
  }
  const url = getApiUrl(getUrlProps)

  if(!url) {
    return
  }

  setElementOpacity(0.7, Array.from(imgContainer.children))

  const imgUrl = await requestImg(url)

  handleResponse(imgUrl)

  setElementOpacity(1, Array.from(imgContainer.children))
}
function handleResponse(response){
  response ? handleOkResponse(response) : handleBadResponse()
}
function handleOkResponse(url){
  clearElementContent(imgContainer)

  const imgElement = document.getElementById('img') || document.createElement('img')
  imgElement.src = url

  imgContainer.appendChild(imgElement)
}

function handleBadResponse(){
  clearElementContent(imgContainer)

  const warningElement = document.createElement('h1')
  warningElement.textContent = 'Нет такого'
  imgContainer.appendChild(warningElement)
}

function getApiUrl(props){
  const {tag, textContent, isGif, filter} = props
  let isFiltered = false

  let url = 'https://cataas.com/cat'

  if(isGif){
    url += '/gif'
    if(textContent){
      url += `/says/${textContent}`
    }
  }
  else if(tag){
    url += `/${tag}`
    if(textContent){
      url += `/says/${textContent}`
    }
  }

  if(filter !== 'none'){
    url +=  `?filter=${filter}`

    if(filter === 'custom'){
      const {sliderRed, sliderGreen, sliderBlue} = slidersFilter

      url += `&r=${sliderRed.value}&g=${sliderGreen.value}&b=${sliderBlue.value}`
    }
    isFiltered = true
  }

  url += isFiltered ? '&' : '?'
  url += 'type=square'

  alert(url)
  return url
}

function setElementOpacity(opacityRate, elements){
  if(!elements.length){
    return
  }

  const elementsArr = Array.isArray(elements) ? elements : [elements]

  elementsArr.forEach(element => element.style.opacity = opacityRate)
}

function clearElementContent(element){
  element.innerHTML = ''
}

function addEventListeners(elements, type, listener){
  elements = Array.isArray(elements) ? elements : [elements]
  elements.forEach(() => addEventListener(type, listener))
}

function setBackgroundColorRgb(element, rgb){
  const [red, green, blue] = rgb

  element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}

function handleFiltersSlide(element){
  const color = Object.values(slidersFilter).map(slider => slider.value)
  setBackgroundColorRgb(element, color)
}

function handleSelectFilterOption(event){
  const sliders = Object.values(slidersFilter)

  if(event.target.value === 'custom'){
    sliders.forEach(slider => toggleElementInteraction(slider))
    return
  }

  sliders.forEach(slider => toggleElementInteraction(slider, true))
}

function toggleElementInteraction(element, force){
  if(force !== undefined){
    element.disabled = force
    return
  }
  element.disabled = !element.disabled
}
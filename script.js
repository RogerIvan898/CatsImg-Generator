import {clearElementContent, toggleElementInteraction, addEventListeners, setBackgroundColorRgb,
  createChildElement, setChildrenOpacity,
} from "./src/helpers.js";

import {buildApiUrl} from "./src/apiUtilits.js";

const inputImgTag = document.getElementById('input-tag')
const inputImgText = document.getElementById('input-text')

const buttonGenerate = document.getElementById('button-request')
const checkBoxIsGif = document.getElementById('set-gif')
const selectFilter = document.getElementById('select-filter')

const colorFilterPreview = document.getElementById('filter-preview')
const imgContainer = document.getElementById('img-container')

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

function generateWaitingImg(){
  const element = createChildElement(imgContainer, 'h1')

  element.textContent = '.'
  element.classList.add('overlay-element')
  element.style.fontSize = '3rem'

  const interval = setInterval(() => {
    if(!element.offsetWidth){
      clearInterval(interval)
    }

    element.textContent.length < 3 ? element.textContent += '.' : element.textContent = '.'
  }, 1000)
}

async function generateImg(){
  const options = {
    tag: inputImgTag.value,
    textContent: inputImgText.value,
    isGif: checkBoxIsGif.checked,
    filter: selectFilter.value,
    sliders: slidersFilter,
  }

  const url = buildApiUrl(options)

  if(!url) {
    return
  }

  generateWaitingImg()
  setChildrenOpacity(imgContainer, 0.7)

  const imgUrl = await requestImg(url)

  handleResponse(imgUrl)

  setChildrenOpacity(imgContainer, 1)
}

function handleResponse(response){
  clearElementContent(imgContainer)
  response ? handleOkResponse(response) : handleBadResponse()
}

function handleOkResponse(url){
  const imgElement = createChildElement(imgContainer, 'img')
  imgElement.src = url
}

function handleBadResponse(){
  const warningElement = createChildElement(imgContainer, 'h1')
  warningElement.textContent = 'Нет такого'
}

function handleFiltersSlide(element){
  const color = Object.values(slidersFilter).map(slider => slider.value)
  setBackgroundColorRgb(element, color)
}

function handleSelectFilterOption(event){
  const isCustomOption = event.target.value === 'custom'
  const sliders = Object.values(slidersFilter)

  sliders.forEach(slider => toggleElementInteraction(slider, !isCustomOption))
}
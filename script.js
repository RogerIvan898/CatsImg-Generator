import {toggleElementInteraction, addEventListeners, setBackgroundColorRgb} from "./src/helpers.js";
import {buildApiUrl} from "./src/apiUtilits.js";
import {ImgContainer} from "./src/ImgContainer.js";

const inputImgTag = document.getElementById('input-tag')
const inputImgText = document.getElementById('input-text')
const inputFontSize = document.getElementById('input-fontSize')

const buttonGenerate = document.getElementById('button-request')
const checkBoxIsGif = document.getElementById('set-gif')

const selectFilter = document.getElementById('select-filter')
const selectType = document.getElementById('select-type')

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
checkBoxIsGif.addEventListener('change', handleCheckboxChange)

const container = new ImgContainer(imgContainer)

async function requestImg(url){
  const response = await fetch(url)

  if(!response.ok){
    return null
  }

  const blobImg = await response.blob()

  return URL.createObjectURL(blobImg)
}

async function generateImg(){
  const options = {
    tag: inputImgTag.value,
    textContent: inputImgText.value,
    isGif: checkBoxIsGif.checked,
    filter: selectFilter.value,
    slidersValue: Object.values(slidersFilter).map(slider => slider.value),
    type: selectType.value,
    fontSize: inputFontSize.value,
  }

  const url = buildApiUrl(options)

  if(!url) {
    return
  }

  container.wait()

  container.setOpacity(0.7)

  const imgUrl = await requestImg(url)
  handleResponse(imgUrl)

  container.setOpacity(1)
}

function handleResponse(response){
  container.clear()
  response ? handleOkResponse(response) : handleBadResponse()
}

function handleOkResponse(url){
  container.createImg(url)
}

function handleBadResponse(){
  container.createWarning('Нет такого')
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

function handleCheckboxChange(event){
  if(!event.target.checked){
    selectType.value = 'square'
  }

  toggleElementInteraction(selectType)
}
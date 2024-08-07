import {
  toggleElementInteraction,
  addEventListeners,
  setBackgroundColorRgb,
  getArrayOfObjectValuesByKey,
  requestImg,
} from "./src/helpers.js";
import {buildApiUrl} from "./src/apiUtilits.js";
import {ImgContainer} from "./src/ImgContainer.js";
import './style.css'

const DEFAULT_FONT_SIZE = 40

const selectImgTag = document.getElementById('select-tag')
const inputImgText = document.getElementById('input-text')
const inputFontSize = document.getElementById('input-fontSize')

const buttonGenerate = document.getElementById('button-request')
const checkBoxIsGif = document.getElementById('set-gif')

const selectFilter = document.getElementById('select-filter')
const selectType = document.getElementById('select-type')

const colorFilterPreview = document.getElementById('filter-preview')

const slidersFilter = {
  sliderRed: document.getElementById('input-red'),
  sliderGreen: document.getElementById('input-green'),
  sliderBlue: document.getElementById('input-blue'),
}

handleFiltersSlide(colorFilterPreview)
inputFontSize.value = DEFAULT_FONT_SIZE

addEventListeners(Object.values(slidersFilter), 'input',() => handleFiltersSlide(colorFilterPreview))
selectFilter.addEventListener('change', handleSelectFilterOption)
buttonGenerate.addEventListener('click', generateImg)
checkBoxIsGif.addEventListener('change', handleCheckboxChange)

const imgContainer = new ImgContainer(document.getElementById('img-container'))

async function generateImg(){
  const options = {
    tag: selectImgTag.value,
    textContent: inputImgText.value,
    isGif: checkBoxIsGif.checked,
    filter: selectFilter.value,
    slidersValue: getArrayOfObjectValuesByKey(slidersFilter, 'value'),
    type: selectType.value,
    fontSize: inputFontSize.value,
  }

  const url = buildApiUrl(options)

  if(!url) {
    return
  }

  imgContainer.wait()

  imgContainer.setOpacity(0.7)

  const imgUrl = await requestImg(url)
  handleResponse(imgUrl)

  imgContainer.setOpacity(1)
}

function handleResponse(response){
  imgContainer.clear()
  response ? handleOkResponse(response) : handleBadResponse()
}

function handleOkResponse(url){
  imgContainer.createImg(url)
}

function handleBadResponse(){
  imgContainer.createWarning('Нет такого')
}

function handleFiltersSlide(element){
  const color = getArrayOfObjectValuesByKey(slidersFilter, 'value')
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
import {copyObject} from "./helpers.js";

export function buildApiUrl(generateOptions){
  const {tag, textContent, isGif, filter, slidersValue, type, fontSize } = generateOptions

  const url = 'https://cataas.com/cat'

  const addGif =  (url, isGif) => isGif ? url + addGifApi() : url
  const addTag = (url, tag) => tag && !isGif && tag !== 'random' ? url + addTagApi(tag) : url
  const addTextContent = (url, textContent) => textContent ? url + addTextContentApi(textContent) : url

  const urlWithGif = addGif(url, isGif)
  const urlWithTag = addTag(urlWithGif, tag)
  const urlWithTextContent = addTextContent(urlWithTag, textContent)

  return urlWithTextContent + addParams([filter, type, slidersValue, fontSize])
}

function addParams([filter, type, slidersValue, fontSize]){
  const params = new URLSearchParams()

  const appendUrlParam = (params, name, value) => {
    const newParams = copyObject(params)
    newParams.append(name, value)
    return newParams
  }

  const addFilterType = (params, filter) => appendUrlParam(params, 'filter', filter)
  const addFilterRgb = (params, rgbColors) => {
    const colorLabels = ['r', 'g', 'b']
    const newParams = copyObject(params)
    colorLabels.forEach((label, index) => newParams.append(label, rgbColors[index]))
    return newParams
  }
  const addFontSize = (params, fontSize) => appendUrlParam(params, 'fontSize', fontSize)
  const addType = (params, type) => type ? appendUrlParam(params, 'type', type) : params

  const paramsWithFilterType = filter !== 'none' ? addFilterType(params, filter) : params
  const paramsWithFilterRbg = filter === 'custom' ? addFilterRgb(paramsWithFilterType, slidersValue) : paramsWithFilterType
  const paramsWithFontSize = fontSize ? addFontSize(paramsWithFilterRbg, fontSize) : paramsWithFilterRbg
  const paramsWithImgType = type ? addType(paramsWithFontSize, type) : paramsWithFontSize

  return '?' + paramsWithImgType
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
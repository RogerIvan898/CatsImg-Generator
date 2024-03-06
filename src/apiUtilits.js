export function buildApiUrl(generateOptions){
  const {tag, textContent, isGif, filter, slidersValue, type, fontSize } = generateOptions

  let url = 'https://cataas.com/cat'

  isGif ? url += addGifApi() : (tag && (url += addTagApi(tag)))
  textContent && (url += addTextContentApi(textContent))
  
  url += addParams([filter, type, slidersValue, fontSize])

  return url
}

function addParams([filter, type, slidersValue, fontSize]){
  let params = new URLSearchParams()

  if(filter && filter !== 'none'){
    params.append('filter', filter)
    filter === 'custom' && addCustomFilter(params, slidersValue)
  }

  if(fontSize){
    params.append('fontSize', fontSize)
  }

  if(type){
    params.append('type', type)
  }

  return '?' + params.toString()
}

function addCustomFilter(params, rgbColors){
  const colorLabels = ['r', 'g', 'b']
  colorLabels.forEach((label, index) => params.append(label, rgbColors[index]))
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
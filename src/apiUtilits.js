export function buildApiUrl(generateOptions){
  const {tag, textContent, isGif, filter, sliders} = generateOptions

  let url = 'https://cataas.com/cat'

  if(isGif){
    url += addGifApi()
  }
  else if(tag){
    url += addTagApi(tag)
  }

  if(textContent){
    url += addTextContentApi(textContent)
  }

  if(filter !== 'none') {
    url += addFilterApi(filter, sliders)
  }

  url +=  url.includes('?') ? '&' : '?'
  url += 'type=square'

  return url
}

function addFilterApi(filter, sliders){
  let filterOptions = `?filter=${filter}`

  if(sliders !== undefined && filter === 'custom'){
    const {sliderRed, sliderGreen, sliderBlue} = sliders
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
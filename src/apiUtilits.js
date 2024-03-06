export function buildApiUrl(generateOptions){
  const {tag, textContent, isGif, filter, slidersValue, type, fontSize } = generateOptions

  const params = [filter, type, slidersValue, fontSize]

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

  if(params.length) {
    url += addParams(params)
  }

  return url
}

function addParams(props){
  const [filter, type, slidersValue, fontSize] = props

  let params = new URLSearchParams()

  if(filter && filter !== 'none'){
    params.append('filter', filter)

    if(filter === 'custom'){
      addCustomFilter(params, slidersValue)
    }
  }

  if(fontSize){
    params.append('fontSize', fontSize)
  }

  if(type){
    params.append('type', type)
  }

  return '?' + params.toString()
}

function addCustomFilter(params, [red, green, blue]){
  params.append('r', red)
  params.append('g', green)
  params.append('b', blue)
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
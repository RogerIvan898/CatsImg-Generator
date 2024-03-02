const inputImgTag = document.getElementById('input-tag')
const inputImgText = document.getElementById('input-text')
const buttonGenerate = document.getElementById('button-request')
const imgArea = document.getElementById('img-area')

buttonGenerate.addEventListener('click', generateImg)

async function requestImg(url){
  const response = await fetch(url)
  console.log()
  if(!response.ok){
    return null
  }

  const blobImg = await response.blob()

  return URL.createObjectURL(blobImg)
}

async function generateImg(){
  const url = getApiUrl()

  if(!url) {
    return
  }

  setElementOpacity(0.7, Array.from(imgArea.children))

  const imgUrl = await requestImg(url)

  handleResponse(imgUrl)

  setElementOpacity(1, Array.from(imgArea.children))
}

function handleResponse(response){
  if(!response){
    handleBadResponse()
    return
  }

  handleOkResponse(response)
}

function handleOkResponse(url){
  clearElementContent(imgArea)

  const imgElement = document.createElement('img')
  imgElement.setAttribute('id', 'img')
  imgElement.src = url

  imgArea.appendChild(imgElement)
}

function handleBadResponse(){
  clearElementContent(imgArea)

  const warningElement = document.createElement('h1')
  warningElement.textContent = 'Нет такого'
  imgArea.appendChild(warningElement)
}

function getApiUrl(){
  const tag = inputImgTag.value
  const text = inputImgText.value

  let url = ''

  if(tag && !text){
    url = `https://cataas.com/cat/${tag}`
  }
  else if(tag && text){
    url = `https://cataas.com/cat/${tag}/says/${text}`
  }

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
  if(!element.hasChildNodes()){
    return
  }
  Array.from(element.children).forEach(childElement => childElement.remove())
}
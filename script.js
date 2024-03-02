const inputImgTag = document.getElementById('input-tag')
const inputImgText = document.getElementById('input-text')
const buttonGenerate = document.getElementById('button-request')
const imgContainer = document.getElementById('img-area')
const checkBoxIsGif = document.getElementById('is-gif')

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
  const url = getApiUrl()

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
  imgElement.id = 'img'
  imgElement.src = url

  imgContainer.appendChild(imgElement)
}

function handleBadResponse(){
  clearElementContent(imgContainer)

  const warningElement = document.createElement('h1')
  warningElement.textContent = 'Нет такого'
  imgContainer.appendChild(warningElement)
}

function getApiUrl(){
  const tag = inputImgTag.value
  const textContent = inputImgText.value
  const isGif = checkBoxIsGif.checked

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
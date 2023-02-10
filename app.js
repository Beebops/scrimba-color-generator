let hexString
let colorMode
let hexCodeArr = []
const count = 5

// DOM elements
const colorInput = document.querySelector('input[type="color"]')
const colorModeInput = document.querySelector('select')
const colorBtn = document.querySelector('#color-btn')

// Event Listeners
colorInput.addEventListener('input', getHexString)
colorModeInput.addEventListener('input', getColorMode)
colorBtn.addEventListener('click', (e) => {
  e.preventDefault()
  renderColors()
})

// Functions

function getHexString() {
  // // get hex code string from color input value
  hexString = colorInput.value
  hexString = this.value
  hexString = hexString.substring(1).toUpperCase()
  return hexString
}

function getColorMode() {
  // returns a string of either 'monochrome' 'monochrome-dark' 'monochrome-light' 'analogic' 'complement' 'analogic-complement' or 'triad quad'
  colorMode = colorModeInput.value.toLowerCase()
  return colorMode
}

async function renderColors() {
  hexCodeArr = await getColorData()
  const colorText = document.querySelectorAll('.color-name')
  const colorDivs = document.querySelectorAll('.color')

  for (let i = 0; i < colorText.length; i++) {
    colorText[i].textContent = hexCodeArr[i]
  }
  for (let i = 0; i < colorDivs.length; i++) {
    colorDivs[i].style.backgroundColor = hexCodeArr[i]
  }
  hexCodeArr = []
}

async function getColorData() {
  try {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${hexString}&mode=${colorMode}&count=${count}`
    )
    const data = await response.json()
    const colorsArr = data.colors
    for (const color of colorsArr) {
      hexCodeArr.push(color.hex.value)
    }
    return hexCodeArr
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

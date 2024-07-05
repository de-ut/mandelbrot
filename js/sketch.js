const canvas = document.querySelector('#canvas')
const selection = document.querySelector('#selection')
const context = canvas.getContext('2d')

let area = {
  cx: 0,
  cy: 0,
  width: 4,
  height: 4
}

function resizeWindow() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function setup() {
  resizeWindow()
  drawFractal(context, area)
}



function checkMandelbrot(c) {
  let z = new Complex(0, 0)
  let i = 0
  while (i < maxIterations - 1 && z.abs() < 4) {
    z.square().add(c)
    i++
  }
  return i
}

function drawFractal(context, area) {
  const width = context.canvas.width
  const height = context.canvas.height

  const ratio = width / height
  area.width = area.height * ratio

  const boundaries = {
    x: [area.cx - area.width / 2, area.cx + area.width / 2],
    y: [area.cy - area.height / 2, area.cy + area.height / 2]
  }

  const img = context.createImageData(width, height)
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const re = boundaries.x[0] + i / width * Math.abs(boundaries.x[1] - boundaries.x[0])
      const im = boundaries.y[1] - j / height * Math.abs(boundaries.y[1] - boundaries.y[0])
      const c = new Complex(re, im)
      const iters = checkMandelbrot(c)
      const color = colors[iters]
      const pixelIdx = (j * width + i) * 4
      img.data[pixelIdx] = color[0]
      img.data[pixelIdx + 1] = color[1]
      img.data[pixelIdx + 2] = color[2]
      img.data[pixelIdx + 3] = color[3]
    }
  }
  context.putImageData(img, 0, 0)
}

setup()

window.addEventListener('resize', () => {
  resizeWindow()
  drawFractal(context, area)
})

function redrawSelection(p1, p2) {
  selection.style.display = 'block'
  const start = [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1])]
  const end = [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])]
  selection.style.left = `${start[0]}px`
  selection.style.top = `${start[1]}px`
  selection.style.width = `${end[0] - start[0]}px`
  selection.style.height = `${end[1] - start[1]}px`
}
function hideSelection() {
  selection.style.display = 'none'
}

function zoomIn(p1, p2) {
  console.log(area)
  console.log(p1, p2)
  const startPoint = [Math.max(Math.min(p1[0], p2[0]), 0), Math.max(Math.min(p1[1], p2[1]), 0)]
  const endPoint = [Math.min(Math.max(p1[0], p2[0]), canvas.width), Math.min(Math.max(p1[1], p2[1]), canvas.height)]
  console.log(startPoint, endPoint)
  console.log(canvas.width, canvas.height)

  const transformCoeff = [area.width / canvas.width, area.height / canvas.height]
  area.cx = area.cx - (area.width / 2) + ((startPoint[0] + endPoint[0]) / 2) * transformCoeff[0]
  area.cy = area.cy + (area.height / 2) - ((startPoint[1] + endPoint[1]) / 2) * transformCoeff[1]
  area.width = (endPoint[0] - startPoint[0]) * transformCoeff[0]
  area.height = (endPoint[1] - startPoint[1]) * transformCoeff[1]

  drawFractal(context, area)
}

function zoomOut() {
  area.width *= 2
  area.height *= 2

  drawFractal(context, area)
}

mouseDownHandler = (e) => {
  const start = [e.pageX, e.pageY]
  mouseMoveHandler = (e) => {
    const curr = [e.pageX, e.pageY]
    redrawSelection(start, curr)
  }
  mouseUpHandler = (e) => {
    const end = [e.pageX, e.pageY]
    hideSelection()
    if (Math.abs(start[0] - end[0]) >= 10 && Math.abs(start[1] - end[1]) >= 10) {
      zoomIn(start, end)
    }
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)
  }
  window.addEventListener('mousemove', mouseMoveHandler)
  window.addEventListener('mouseup', mouseUpHandler)
}

window.addEventListener('mousedown', mouseDownHandler)
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  zoomOut()
})
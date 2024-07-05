const canvas = document.querySelector('#canvas')

let size = initialSize

function setup() {
  createCanvas(canvasWidth * canvasScaling, canvasHeight * canvasScaling, P2D, canvas)
}

function draw() {
  background(255)
  const boundaries = {
    x: [zoomPoint.x - size * ratio / 2, zoomPoint.x + size * ratio / 2],
    y: [zoomPoint.y - size / 2, zoomPoint.y + size / 2]
  }
  const img = createFractal(boundaries, canvasWidth, canvasHeight)
  image(img, 0, 0)
  color(255, 0, 0)
  circle(canvasWidth * canvasScaling / 2, canvasHeight * canvasScaling / 2, 1)
  size *= sizeScale
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

function createFractal(boundaries, canvasWidth, canvasHeight) {
  let img = createImage(canvasWidth, canvasHeight);
  img.loadPixels()
  for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasHeight; j++) {
      const re = boundaries.x[0] + i / canvasWidth * Math.abs(boundaries.x[1] - boundaries.x[0])
      const im = boundaries.y[1] - j / canvasHeight * Math.abs(boundaries.y[1] - boundaries.y[0])
      const c = new Complex(re, im)
      const iters = checkMandelbrot(c)
      img.set(i, j, colors[iters])
    }
  }
  img.updatePixels()
  img.resize(canvasWidth*canvasScaling, canvasHeight*canvasScaling)
  return img
}
const canvasWidth = 800
const canvasHeight = 600
const canvasScaling = 1
const ratio = canvasWidth / canvasHeight

const initialSize = 2
const sizeScale = 0.98

const zoomPoint = {
  x: 0.236,
  y: 0.52
}
const maxIterations = 200

const gradientFunction = createGradientFunction([0, 0, 255], [255, 255, 255])
function colorFunc(i){
  if (i == maxIterations - 1){
    return [0, 0, 0, 255]
  }
  const iterMix = i / maxIterations
  const mix = iterMix
  return [...gradientFunction(mix), 255]
}

const colors = Array.from(Array(maxIterations)).map((_, i) => colorFunc(i))
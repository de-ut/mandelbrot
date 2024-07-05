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

let colors

function colorMode1(){
  colors = Array.from(Array(maxIterations)).map((_, i) => colorFunc(i))
}

function colorMode2(){
  colors = Array.from(Array(maxIterations)).map((_, i) => {
    return i % 2 == (maxIterations - 1) % 2 ? [0, 0, 0, 255] : [255, 255, 255, 255]
  })
}

function colorMode3(){
  colors = Array.from(Array(maxIterations)).map((_, i) => {
    if (i == maxIterations - 1){
      return [0, 0, 0, 255]
    }
    return i % 2 == 0 ? [255, 0, 0, 255] : [0, 255, 0, 255]
  })
}

colorMode1()


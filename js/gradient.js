function sRGBCompanding(color) {
  return color.map(c => {
    const res = c <= 0.0031308 ? 12.92 * c : (1.055 * (c ** (1 / 2.4))) - 0.055
    return res * 255
  })
}

function sRGBInverseCompanding(color) {
  return color.map(c => {
    const n = c / 255
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4
  })
}

function linearInterpolation(c1, c2, mix) {
  return c1 + (c2 - c1) * mix
}

function createGradientFunction(color1, color2) {
  const [r1, g1, b1] = sRGBInverseCompanding(color1)
  const [r2, g2, b2] = sRGBInverseCompanding(color2)

  const gradientFunction = (mix) => {
    let r = linearInterpolation(r1, r2, mix)
    let g = linearInterpolation(g1, g2, mix)
    let b = linearInterpolation(b1, b2, mix)

    if (r + g + b != 0) {
      const gamma = 0.43
      const brightness1 = Math.pow(r1 + g1 + b1, gamma)
      const brightness2 = Math.pow(r2 + g2 + b2, gamma)
      const brightness = linearInterpolation(brightness1, brightness2, mix)
      const intensity = Math.pow(brightness, 1 / gamma)
      const factor = (intensity / (r + g + b))
      r *= factor
      g *= factor
      b *= factor
    }

    const res = sRGBCompanding([r, g, b])
    return res
  }

  return gradientFunction
}
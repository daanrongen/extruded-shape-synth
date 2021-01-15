var imageObj = new Image()
imageObj.src = "pic.jpg"

var canvas = document.getElementById("myCanvas")
var canvas2 = document.getElementById("myCanvas2")

var context = canvas.getContext("2d")
var context2 = canvas2.getContext("2d")
var imageWidth = imageObj.width
var imageHeight = imageObj.height

context2.drawImage(imageObj, 0, 0)

var imageData = context2.getImageData(0, 0, imageWidth, imageHeight)
var data = imageData.data

var imageData2 = context.getImageData(0, 0, imageWidth, imageHeight)
var imageData3 = context.getImageData(0, 0, imageWidth, imageHeight)

for (var i = 1; i < imageHeight - 1; i++) {
  var collm1 = (i - 1) * imageWidth
  var collp1 = (i + 1) * imageWidth

  for (var j = 1; j < imageWidth - 1; j++) {
    /**
     * The blur-effect uses a 3x3 kernel:
     * 0.0625 0.125 0.0625
     * 0.125 0.25 0.125
     * 0.0625 0.125 0.0625
     */

    imageData2.data[(imageWidth * i + j) * 4] =
      0.0625 * data[(imageWidth * i + j - 1) * 4] +
      0.125 * data[(imageWidth * i + j - 1) * 4] +
      0.0625 * data[(imageWidth * i + j - 1) * 4] +
      0.125 * data[(imageWidth * i + j - 1) * 4] +
      0.25 * data[(imageWidth * i + j - 1) * 4] +
      0.125 * data[(imageWidth * i + j - 1) * 4] +
      0.0625 * data[(imageWidth * i + j - 1) * 4] +
      0.125 * data[(imageWidth * i + j - 1) * 4] +
      0.0625 * data[(imageWidth * i + j - 1) * 4]

    imageData2.data[(imageWidth * i + j) * 4 + 1] =
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.25 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 1] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 1]

    imageData2.data[(imageWidth * i + j) * 4 + 2] =
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.25 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.125 * data[(imageWidth * i + j - 1) * 4 + 2] +
      0.0625 * data[(imageWidth * i + j - 1) * 4 + 2]

    imageData2.data[(imageWidth * i + j) * 4 + 3] = 255

    imageData2.data[(imageWidth * i + j) * 4] +=
      -1 * data[(collm1 + j - 1) * 4] + data[(collp1 + j + 1) * 4]
    imageData2.data[(imageWidth * i + j) * 4 + 1] +=
      -1 * data[(collm1 + j - 1) * 4 + 1] + data[(collp1 + j + 1) * 4]
    imageData2.data[(imageWidth * i + j) * 4 + 2] +=
      -1 * data[(collm1 + j - 1) * 4 + 2] + data[(collp1 + j + 1) * 4]
    imageData2.data[(imageWidth * i + j) * 4 + 3] += 255
  }
}

context.putImageData(imageData2, 0, 0)

## NPM Module Required
- Basic Section
 - [x] canvas
 - [x] glob
 - [x] node-fetch
 - [x] chalk
 - [x] chart.js
 - [x] axios
- GIF Section
 - [x] pixel-gif
- Font Section
 - [x] opentype.js
- Image Recognize Section
 - [x] tesseract.js
- Extension
 - [x] unzipper
 - [x] chalk
 - [x] node-fetch

## Canvas Dependencies Required
- [x] gifski https://github.com/ImageOptim/gifski/releases
- [x] dwebp https://developers.google.com/speed/webp/download
- [x] palette.js https://github.com/google/palette.js/blob/master/palette.js

## Preparation

> Use **Npm i axios** since that's a required library by **DBM-E**
![image](https://cdn.discordapp.com/attachments/886234967338786896/933278405363900426/index.png)

## Documentation
### Basic Image Manipulate
* [Create Image](#create-image)
* [Draw Image](#draw-image)
* [Draw Text](#draw-text)
### Advanced Image Manipulate
* [Image Options](#image-options)
* [Crop Image](#crop-image)
* [Edit Border](#edit-border)
* [Filter Image](#filter-image)
* [Generate Progress Bar](#generate-progress-bar)
* [Image Recognize](#image-recognize)
* [Generate Graph](#generate-graph)
### Others
* [Image Buffer](#image-buffer)
* [Save Image Local](#save-image-local)
* [Discord Attachment](#discord-attachment)
* [Image Bridge](#image-bridge)

## Create Image
```js
DBM.Actions.Canvas.createImage(url, options) => Promise[Image]
```
Image type support png, jpg, gif webp(still image) and of course base64 image, it can be web image or local
- [String] **`url`** source image from local or url
- [Object] **`options`**
  - [Integer] **`delay`** Delay for gif if image is animated
  - [Integer] **`loop`** Loop for gif if image is animated
  - [Integer] **`overlap`** Redraw gif by previous frame, value should be `0` - `2`, `0` is Auto, `1` is True and `2` is False
```
this.Canvas.createImage('https://www.website.com/image_**.png', { delay: 100, loop: 0, overlap: 0 }).then((image) => {
})

// or with async/await:
const image = await this.Canvas.createImage('.\resources\img.gif')
}
```

## Draw Image
```js
DBM.Actions.Canvas.drawImage(img1, img2, options) => [Image]
```
Draw img2 on top of img1 with ton of options
- [Image] **`img1`** **`img2`** image generate from canvas
- [Object] **`options`**
  - [Integer] **`x`** Position x of left of img1
  - [Integer] **`y`** Position y of top of img1
  - [Integer] **`opacity`** or name as transparent, which control img2 when it draw, not effect on img1, effective value range is from 0 to 100
  - [Integer | String] **`effect`** draw effect for img2, exist value is `'mask'` or `1`, leave it empty for draw overlay
  - [Boolean] **`expand`** it will expand img1 size if img2 is large than img1
```js
this.Canvas.drawImage(img1 ,img2, { x: 5, y: 5, opacity: 100, expand: false })
```

## Draw Text
```js
DBM.Actions.Canvas.drawText(img, text, options) => [Image]
```
Draw text on above image with support font TrueType and OpenType
- [Image] **`img`** image generate from canvas
- [String] **`text`** Text that will write on the image
- [Object] **`options`**
  - [Integer] **`x`** Position x of img
  - [Integer] **`y`** Position y of img
  - [String] **`color`** Color of the text, example `'#000000'` or `'000000'`
  - [Integer] **`size`** Size of the font
  - [Integer | String] **`align`** Alignment for the text, value should be `0` to `8` or `'TL'`, `'TC'`, `'TR'`, `'ML'`, `'BL'`...
  - [String] **`type`** Fill type, exist value is `'fill'` or `'stroke'`
  - [Integer] **`maxWidth`** Width from start of the text to end of it, if set to `80` the width of text will below or equal to the maxWidth
  - [String] **`font`** The path of the font file
  - [Boolean] **`antialias`** anti alias for the text
  - [Boolean] **`rotate`** Rotate for the text, effective range should be `0` - `359`
  - [Boolean | Integer] **`autoWrap`** Auto wrap for text if text's width is bigger than max width, exist value is `1` or `true`, leave it blank to disable it
```js
this.Canvas.drawText(img, 'Hello World', { x: 5, y: 5, color: '#000000', size: 20, align: 'TL', type: 'fill', maxWidth: 40, font: 'fonts\arial.ttf', rotate: 180, antialias: true})
```

## Image Options
```js
DBM.Actions.Canvas.controlImage(img, options) => [Image]
```
Control image function includes resize or scale, flip and rotate
- [Image] **`img`** image generate from canvas
- [Object] **`options`**
  - [Object] **`resize`** Options for resize
    - [Integer] **`width`** width for the image
    - [Integer] **`height`** height for the image
    - [Boolean] **`aspectRatio`** Set `true` to keep the image look same after scale
  - [Integer | String] **`flip`** Flip image with 3 possible way, `0` - `3` or `horizontal`, `vertical` and `diagonal`
  - [Integer] **`rotate`** Rotate the image, the width and the height will auto change to size after rotate
  - [Integer | String] **`resampling`** Resize image with resample method, exist value is `0` to `2` or `'good'` | `'bilinear'`, `'best'` | `'bicubic'`, `'fast'` | `'nearest'`
  - [Integer | String] **`opacity`** Control image opacity with value `50%` for global opacity or use number between `1` to `255` for each pixel opacity
```js
this.Canvas.controlImage(img, { resize: { width: 500, aspectRatio: true }, rotate: 90 })
```

## Crop Image
```js
DBM.Actions.Canvas.cropImage(img, options)
```
Crop image to smaller or bigger
- [Image] **`img`** image generate from canvas
- [Object] **`options`**
  - [Integer | String] **`width`** Width of the new image size, example `50` or `'125%'`
  - [Integer | String] **`height`** Height of the new image size, example `25` or `'75%'`
  - [Integer | String] **`align`** Alignment for the cropping position, value should be `0` to `9` or `'TL'`, `'TC'`, `'TR'`, `'ML'`, `'BL'`...
  - [Integer | String] **`align2`** Alignment for the cropping position, if `align` value is `9`, then this parameter is required, value should be `0` to `8` or `'TL'`, `'TC'`, `'TR'`, `'ML'`, `'BL'`...
  - [Integer] **`x`** Position x for the alignment
  - [Integer] **`y`** Position y for the alignment
```js
this.Canvas.cropImage(img, { width: '50%', height: '50%', align: 9, align2: 4, x: 15, y: 25 })
```

## Edit Border
```js
DBM.Actions.Canvas.editBorder(img, type, radius) => [Image]
```
Edit image border to get a better look, bounder either is circle or round
- [Image] **`img`** image generate from canvas
- [Integer | String] **`type`** Border type, circle type value is `'circle'` | `1` and round type is `'corner'` or `0`
- [Integer] **`radius`** If border type is `corner`, this parameter is required
```js
this.Canvas.editBorder(img , 'corner', 50)
```

## Filter Image
```js
DBM.Actions.Canvas.Filter(img, type, value) => [Image]
```
Add some filter to the image
- [Image] **`img`** image generate from canvas
- [Integer | String] **`type`** Type for the filter, value should be `0` - `8` or `'blur'`, `'huerotate'`, '`brightness`', '`contrast`', '`grayscale`', '`invert`', '`opacity`', '`saturate`' and '`sepia`'
- [Integer] **`value`** Total percent of the filter will add to image, effective range should be `0` - `100`
```js
this.Canvas.Filter(img, 'huerotate', 50)
```

## Generate Progress Bar
```js
DBM.Actions.Canvas.generateProgress(options, lineCap, lineWidth, percent, color) => [Image]
```
Generate progress bar from options and other info
- [Object] **`options`**
  - [Integer | String] **`type`** Type for progress bar, circle type value is `'circle'` | `1` and basic type is `'basic'`, `'normal` or `0`
  - [Integer] **`width`** Width of progress bar if type is `basic`, else is radius for `circle`
  - [Integer] **`height`** Height of progress bar if type is `basic`, else if dimention for total width and height of the image for `circle`
- [Integer | String] **`lineCap`** Line cap for basic style is `0` or `'square'` and for round type is `1` or `'round'`
- [Integer] **`lineWidth`** Line width is stroke width
- [Integer] **`percent`** Percent available from `0` to `100`
- [String] **`color`** Color of the progress bar, example `'#000000'` or `'000000'`
```js
this.Canvas.generateProgress({ type: 'circle', width: 100, height: 240 }, 'round', 20, 50, '#000000')
```

## Image Recognize
```js
DBM.Actions.Canvas.Recognize(img, options) => Promise[String]
```
Text recognize from tesseract.js
- [Image] **`img`** image generate from canvas
- [Object] **`options`**
  - [Integer] **`left`** Left of the rectangle that scan
  - [Integer] **`top`** Top of the rectangle that scan
  - [Integer] **`width`** Width of the rectangle
  - [Integer] **`height`** Height of the rectangle
  - [String] **`lang`** Target language, it can be `'eng+chi_tra'` for English and Traditional Chinese
  - [Integer] **`offset`** Offset for the rectangle if max is more than 1
  - [String] **`offsetType`** Offset type for the offset value, value should be `'percentage'`, `'percent'`, `'pixel'` and `'px'`
  - [Integer] **`max`** Max try for each image, the more try doesnt mean will have better result
  - [Boolean] **`forceMax`** If found a perfect result and `forceMax` is false, it will stop the work
```js
this.Canvas.Recognize(img, { left: 0, top: 0, width: 200, height: 200, lang: 'eng', offset: 5, offsetType: 'pixel', max: 3, forceMax: false, acceptRange: 80, forceAccept: true, debug: false })
```

## Generate Graph
```js
DBM.Actions.Canvas.generateChart(type, width, height, title, labels, data, sort, bgColor, bgColorAlpha, borderWidth, borderColor, borderColorAlpha, options) => [Image]
```
Generate many type of graph with chart.js
- [String] **`type`** Type of graph, value should be '`line`', `'bar'`, '`horizontalBar`', '`radar`', '`pie`', '`doughnut`' and '`polarArea`'
- [Integer] **`width`** Width for the image
- [Integer] **`height`** Height for the image
- [String] **`title`** Title of the graph
- [Array] **`labels`** An array of all labels, example `['bar1', 'bar2', 'bar3']`
- [Array] **`data`** An array of all data, example `[10,20,30]`
- [Integer] **`sort`** Sort for result, value should be `0`, `1` or `2`
- [String] **`bgColor`** Color of the object, example `'222831,00adb5,eeeeee'`
- [Integer] **`bgColorAlpha`** Control object's opacity with value between `0` to `1`
- [Integer] **`borderWidth`** Border's width of the object
- [String] **`borderColor`** Border's color of the object, example `'222831,00adb5,eeeeee'`
- [Integer] **`borderColorAlpha`** Control border object's opacity with value between `0` to `1`
- [Object] **`option`** Please check at [Chart.js](https://www.chartjs.org/)

```js
this.Canvas.generateChart('bar', 800, 400, 'Score', ['Team Red', 'Team Blue', 'Team Green'], [33, 66, 99], 2, , 0.1, 1, , 1, {})
```

## Image Buffer
```js
DBM.Actions.Canvas.toBuffer(img) => [Buffer]
```
Convert gif/still image to buffer
- [Image] **`img`** image generate from canvas
```js
const buffer = DBM.Actions.Canvas.toBuffer(img)
```

## Save Image Local
```js
DBM.Actions.Canvas.Export(img, destination)
```
Save gif/still image to local directly
- [Image] **`img`** image generate from canvas
- [String] **`destination`** local path for image
```js
const buffer = DBM.Actions.Canvas.Export(img, 'resources\\export.png')
```

## Discord Attachment
```js
DBM.Actions.Canvas.toAttachment(img ,name) => [Discord Attachment]
```
Convert image to discord attachment
- [Image] **`img`** image generate from canvas
- [String] **`name`** name for the attachment, example `'image.png'` or `'image'`
```js
this.Canvas.toAttachment(img, 'image')
```

## Image Bridge
```js
DBM.Actions.Canvas.bridge(img, type) => Promise[image]
```
Function convert Canvas image to Jimp image or Jimp image to Canvas image
- [Image] **`img`** target image
- [Integer] **`type`** value for (C->J) is `0` and (J->C) is blank or any number that value is not `0`
```js
this.Canvas.bridge(img, 1).then((image) => {
})

// or with async/await:
const image = await this.Canvas.bridge(img, 0)
}
```

## Image Format
- Still Image
  - [Object] Type
    - [Boolean] **`animated`** Is animated, default value is `false`
    - [Array] **`extensions`** possible of image extension
    - [Image] **`image`** image with base64 format, it should start with `data:image/png;base64`
  - Mainly format from `png`, `jpg`, `webp`, or `base64`
- Animated/GIF Image
  - [Object] Type
    - [Integer] **`width`** Width of the gif
    - [Integer] **`height`** Height of the gif
    - [Boolean] **`animated`** Is animated, default value is `true`
    - [Array] **`extensions`** possible of image extension
    - [Array] **`images`** Array images of the gif
      - [Image] **`img`** image generate from canvas
    - [Integer] **`delay`** Delay for the each frame
    - [Integer] **`loopCount`** Loop for the gif, if it is `0`, mean infinity loop
    - [Integer] **`totalFrames`** Total frames in this gif image
  - Mainly format from `gif` or multiple local png image

## Align Format
- [Integer] Type 1
  -  **`align`** valid from `0` to `8`
- [String] Type 2
  -  **`align`** valid values `'TL'`, `'TC'`, `'TR'`, `'ML'`, `'MC'`, `'MR'`, `'BL'`, `'BC'` and `'BR'`

## Mod List
1. Canvas Create Image
2. Canvas Create Background
3. Canvas Crop Image
4. Canvas Draw Image on Image
5. Canvas Draw Text on Image
6. Canvas Edit Image Border
7. Canvas Generate Progress Bar
8. Canvas Gif to Png
9. Canvas Image Bridge
10. Canvas Image Filter
11. Canvas Image Options
12. Canvas Image Recognize
13. Canvas Save Image
14. Canvas Send Image
15. Canvas Set Gif Option
16. Store Canvas Info
17. Canvas Generate Graph
18. About Canvas Mod

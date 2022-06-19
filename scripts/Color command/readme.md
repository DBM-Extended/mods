# THIS COMMAND REQUIRES THE FOLLOWING NODE MODULES TO WORK:
`canvas` and `color-convert`. If you don't have these, open up your command prompt / cmd.exe and type both of these:
```js
npm i canvas
```
```js
npm i color-convert
```
If you're *still* having issues with it, run this and wait (it takes awhile), then install `npm i canvas` again:
```js
npm install --global --production windows-build-tools
```

This command supports multiple formats, listed below:
```yaml
blue	yellow	green
decimal(14239746)
#FF00cc		FF00cc		0xFF00cc
rgb(15,35,49)			rgb(14%,29%,16)
hsl(49,25%,100%)		hsl(16,16%,55%)
hsv(49,25%,100%)		hsv(16%,15,100%)
cmyk(14%,15%,94%,43%)		cmyk(15,15,92,14)
hwb(49,25%,100%)		hwb(1%,99%,43%)
lab(15,35,49)			lab(25%,25%,2%)
xyz(15,35,49)			xyz(83%,4%,45%)
apple(43009, 29554, 1400)	apple(15%, 15%, 160)
```
It also supports adding additional color names so you can just type
> !color superhotbrightpink

and it will return the color value you specified (example: `#DB4F96`) To do this, just go to this object:
```js
const CGs_colors = {
   'brown': '#964B00',
   'othercolorname': '#HEXCODE'
}
```
then replace the `othercolorname` with the name of the color you want to be able to type in lowercase, and with no spaces/underscores/etc. (example: `viridian`), and the `#HEXCODE` with the hex code for that color (example: `#40826D`)
To add more colors, just add a **,** comma after the final **'** apostophe, enter into a new line, and place your new color and hex code. Example:
```js
const CGs_colors = {
   'brown': '#964B00',
   'othercolorname1': '#HEXCODE1',
   'othercolorname2': '#HEXCODE2',
   'othercolorname3': '#HEXCODE3',
   'othercolorname4': '#HEXCODE4'
}
```
MAKE SURE THOUGH to have the final line NOT include a comma. Here's an example of this in action:
![Image description](https://i.imgur.com/choZ5qa.png)

<template>
  <div class="colors">
    <h1>
      colors
    </h1>

    <div class="sort-bar">
      {{ sortedColors.length }}
      colors sort by
      <select v-model="sortby">
        <option value="none">None</option>
        <option value="hex">HEX</option>
        <option value="hue">Hue</option>
        <option value="light">Light</option>
        <option value="huelight">Hue + Light</option>
      </select>
    </div>

    <div class="color-list">
      <div v-for="color in sortedColors" class="color">
        <div class="color-box-wrapper">
          <span
            class="color-box"
            :style="`--color: #${color.hex}`"
          />
        </div>
        <div class="info">
          {{ color.name }}
          <div v-if="sortby === 'hex'" class="code">
            #{{ color.hex }}
          </div>
          <div v-else-if="sortby === 'hue' || sortby === 'light' || sortby === 'huelight'" class="code">
            hsl({{ color.hsl.h }},{{ color.hsl.s }},{{ color.hsl.l }})
          </div>
          <div v-else class="code">
            rgb({{ color.rgb.r }},{{ color.rgb.g }},{{ color.rgb.b }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sortby = ref('none') // none, hex, hue, light, huelight

const colors = [
  { name: 'AliceBlue', hex: 'F0F8FF', rgb: { r: 240, g: 248, b: 255 }},
  { name: 'AntiqueWhite', hex: 'FAEBD7', rgb: { r: 250, g: 235, b: 215 }},
  { name: 'Aqua', hex: '00FFFF', rgb: { r: 0, g: 255, b: 255 }},
  { name: 'Aquamarine', hex: '7FFFD4', rgb: { r: 127, g: 255, b: 212 }},
  { name: 'Azure', hex: 'F0FFFF', rgb: { r: 240, g: 255, b: 255 }},
  { name: 'Beige', hex: 'F5F5DC', rgb: { r: 245, g: 245, b: 220 }},
  { name: 'Bisque', hex: 'FFE4C4', rgb: { r: 255, g: 228, b: 196 }},
  { name: 'Black', hex: '000000', rgb: { r: 0, g: 0, b: 0 }},
  { name: 'BlanchedAlmond', hex: 'FFEBCD', rgb: { r: 255, g: 235, b: 205 }},
  { name: 'Blue', hex:  '0000FF', rgb: { r: 0, g: 0, b: 255 }},
  { name: 'BlueViolet', hex: '8A2BE2', rgb: { r: 138, g: 43, b: 226 }},
  { name: 'Brown', hex: 'A52A2A', rgb: { r: 165, g: 42, b: 42 }},
  { name: 'BurlyWood', hex: 'DEB887', rgb: { r: 222, g: 184, b: 135 }},
  { name: 'CadetBlue', hex: '5F9EA0', rgb: { r: 95, g: 158, b: 160 }},
  { name: 'Chartreuse', hex: '7FFF00', rgb: { r: 127, g: 255, b: 0 }},
  { name: 'Chocolate', hex: 'D2691E', rgb: { r: 210, g: 105, b: 30 }},
  { name: 'Coral', hex: 'FF7F50', rgb: { r: 255, g: 127, b: 80 }},
  { name: 'CornflowerBlue', hex:  '6495ED', rgb: { r: 100, g: 149, b: 237 }},
  { name: 'Cornsilk', hex: 'FFF8DC', rgb: { r: 255, g: 248, b: 220 }},
  { name: 'Crimson', hex: 'DC143C', rgb: { r: 220, g: 20, b: 60 }},
  { name: 'Cyan', hex: '00FFFF', rgb: { r: 0, g: 255, b: 255 }},
  { name: 'DarkBlue', hex: '00008B', rgb: { r: 0, g: 0, b: 139 }},
  { name: 'DarkCyan', hex: '008B8B', rgb: { r: 0, g: 139, b: 139 }},
  { name: 'DarkGoldenRod', hex: 'B8860B', rgb: { r: 184, g: 134, b: 11 }},
  { name: 'DarkGray', hex: 'A9A9A9', rgb: { r: 169, g: 169, b: 169 }},
  { name: 'DarkGrey', hex: 'A9A9A9', rgb: { r: 169, g: 169, b: 169 }},
  { name: 'DarkGreen', hex: '006400', rgb: { r: 0, g: 100, b: 0 }},
  { name: 'DarkKhaki', hex: 'BDB76B', rgb: { r: 189, g: 183, b: 107 }},
  { name: 'DarkMagenta', hex: '8B008B', rgb: { r: 139, g: 0, b: 139 }},
  { name: 'DarkOliveGreen', hex:  '556B2F', rgb: { r: 85, g: 107, b: 47 }},
  { name: 'DarkOrange', hex: 'FF8C00', rgb: { r: 255, g: 140, b: 0 }},
  { name: 'DarkOrchid', hex: '9932CC', rgb: { r: 153, g: 50, b: 204 }},
  { name: 'DarkRed', hex: '8B0000', rgb: { r: 139, g: 0, b: 0 }},
  { name: 'DarkSalmon', hex: 'E9967A', rgb: { r: 233, g: 150, b: 122 }},
  { name: 'DarkSeaGreen', hex: '8FBC8F', rgb: { r: 143, g: 188, b: 143 }},
  { name: 'DarkSlateBlue', hex: '483D8B', rgb: { r: 72, g: 61, b: 139 }},
  { name: 'DarkSlateGray', hex: '2F4F4F', rgb: { r: 47, g: 79, b: 79 }},
  { name: 'DarkSlateGrey', hex: '2F4F4F', rgb: { r: 47, g: 79, b: 79 }},
  { name: 'DarkTurquoise', hex: '00CED1', rgb: { r: 0, g: 206, b: 209 }},
  { name: 'DarkViolet', hex: '9400D3', rgb: { r: 148, g: 0, b: 211 }},
  { name: 'DeepPink', hex: 'FF1493', rgb: { r: 255, g: 20, b: 147 }},
  { name: 'DeepSkyBlue', hex: '00BFFF', rgb: { r: 0, g: 191, b: 255 }},
  { name: 'DimGray', hex: '696969', rgb: { r: 105, g: 105, b: 105 }},
  { name: 'DimGrey', hex: '696969', rgb: { r: 105, g: 105, b: 105 }},
  { name: 'DodgerBlue', hex:  '1E90FF', rgb: { r: 30, g: 144, b: 255 }},
  { name: 'FireBrick', hex: 'B22222', rgb: { r: 178, g: 34, b: 34 }},
  { name: 'FloralWhite', hex: 'FFFAF0', rgb: { r: 255, g: 250, b: 240 }},
  { name: 'ForestGreen', hex: '228B22', rgb: { r: 34, g: 139, b: 34 }},
  { name: 'Fuchsia', hex: 'FF00FF', rgb: { r: 255, g: 0, b: 255 }},
  { name: 'Gainsboro', hex: 'DCDCDC', rgb: { r: 220, g: 220, b: 220 }},
  { name: 'GhostWhite', hex: 'F8F8FF', rgb: { r: 248, g: 248, b: 255 }},
  { name: 'Gold', hex: 'FFD700', rgb: { r: 255, g: 215, b: 0 }},
  { name: 'GoldenRod', hex: 'DAA520', rgb: { r: 218, g: 165, b: 32 }},
  { name: 'Gray', hex: '808080', rgb: { r: 128, g: 128, b: 128 }},
  { name: 'Grey', hex: '808080', rgb: { r: 128, g: 128, b: 128 }},
  { name: 'Green', hex: '008000', rgb: { r: 0, g: 128, b: 0 }},
  { name: 'GreenYellow', hex: 'ADFF2F', rgb: { r: 173, g: 255, b: 47 }},
  { name: 'HoneyDew', hex: 'F0FFF0', rgb: { r: 240, g: 255, b: 240 }},
  { name: 'HotPink', hex: 'FF69B4', rgb: { r: 255, g: 105, b: 180 }},
  { name: 'IndianRed', hex: 'CD5C5C', rgb: { r: 205, g: 92, b: 92 }},
  { name: 'Indigo', hex: '4B0082', rgb: { r: 75, g: 0, b: 130 }},
  { name: 'Ivory', hex: 'FFFFF0', rgb: { r: 255, g: 255, b: 240 }},
  { name: 'Khaki', hex: 'F0E68C', rgb: { r: 240, g: 230, b: 140 }},
  { name: 'Lavender', hex:  'E6E6FA', rgb: { r: 230, g: 230, b: 250 }},
  { name: 'LavenderBlush', hex: 'FFF0F5', rgb: { r: 255, g: 240, b: 245 }},
  { name: 'LawnGreen', hex: '7CFC00', rgb: { r: 124, g: 252, b: 0 }},
  { name: 'LemonChiffon', hex: 'FFFACD', rgb: { r: 255, g: 250, b: 205 }},
  { name: 'LightBlue', hex: 'ADD8E6', rgb: { r: 173, g: 216, b: 230 }},
  { name: 'LightCoral', hex: 'F08080', rgb: { r: 240, g: 128, b: 128 }},
  { name: 'LightCyan', hex: 'E0FFFF', rgb: { r: 224, g: 255, b: 255 }},
  { name: 'LightGoldenRodYellow', hex:  'FAFAD2', rgb: { r: 250, g: 250, b: 210 }},
  { name: 'LightGray', hex: 'D3D3D3', rgb: { r: 211, g: 211, b: 211 }},
  { name: 'LightGrey', hex: 'D3D3D3', rgb: { r: 211, g: 211, b: 211 }},
  { name: 'LightGreen', hex: '90EE90', rgb: { r: 144, g: 238, b: 144 }},
  { name: 'LightPink', hex: 'FFB6C1', rgb: { r: 255, g: 182, b: 193 }},
  { name: 'LightSalmon', hex: 'FFA07A', rgb: { r: 255, g: 160, b: 122 }},
  { name: 'LightSeaGreen', hex: '20B2AA', rgb: { r: 32, g: 178, b: 170 }},
  { name: 'LightSkyBlue', hex: '87CEFA', rgb: { r: 135, g: 206, b: 250 }},
  { name: 'LightSlateGray', hex: '778899', rgb: { r: 119, g: 136, b: 153 }},
  { name: 'LightSlateGrey', hex: '778899', rgb: { r: 119, g: 136, b: 153 }},
  { name: 'LightSteelBlue', hex: 'B0C4DE', rgb: { r: 176, g: 196, b: 222 }},
  { name: 'LightYellow', hex: 'FFFFE0', rgb: { r: 255, g: 255, b: 224 }},
  { name: 'Lime', hex:  '00FF00', rgb: { r: 0, g: 255, b: 0 }},
  { name: 'LimeGreen', hex: '32CD32', rgb: { r: 50, g: 205, b: 50 }},
  { name: 'Linen', hex: 'FAF0E6', rgb: { r: 250, g: 240, b: 230 }},
  { name: 'Magenta', hex: 'FF00FF', rgb: { r: 255, g: 0, b: 255 }},
  { name: 'Maroon', hex:  '800000', rgb: { r: 128, g: 0, b: 0 }},
  { name: 'MediumAquaMarine', hex:  '66CDAA', rgb: { r: 102, g: 205, b: 170 }},
  { name: 'MediumBlue', hex:  '0000CD', rgb: { r: 0, g: 0, b: 205 }},
  { name: 'MediumOrchid', hex:  'BA55D3', rgb: { r: 186, g: 85, b: 211 }},
  { name: 'MediumPurple', hex:  '9370DB', rgb: { r: 147, g: 112, b: 219 }},
  { name: 'MediumSeaGreen', hex:  '3CB371', rgb: { r: 60, g: 179, b: 113 }},
  { name: 'MediumSlateBlue', hex: '7B68EE', rgb: { r: 123, g: 104, b: 238 }},
  { name: 'MediumSpringGreen', hex: '00FA9A', rgb: { r: 0, g: 250, b: 154 }},
  { name: 'MediumTurquoise', hex: '48D1CC', rgb: { r: 72, g: 209, b: 204 }},
  { name: 'MediumVioletRed', hex: 'C71585', rgb: { r: 199, g: 21, b: 133 }},
  { name: 'MidnightBlue', hex:  '191970', rgb: { r: 25, g: 25, b: 112 }},
  { name: 'MintCream', hex: 'F5FFFA', rgb: { r: 245, g: 255, b: 250 }},
  { name: 'MistyRose', hex: 'FFE4E1', rgb: { r: 255, g: 228, b: 225 }},
  { name: 'Moccasin', hex:  'FFE4B5', rgb: { r: 255, g: 228, b: 181 }},
  { name: 'NavajoWhite', hex: 'FFDEAD', rgb: { r: 255, g: 222, b: 173 }},
  { name: 'Navy', hex:  '000080', rgb: { r: 0, g: 0, b: 128 }},
  { name: 'OldLace', hex: 'FDF5E6', rgb: { r: 253, g: 245, b: 230 }},
  { name: 'Olive', hex: '808000', rgb: { r: 128, g: 128, b: 0 }},
  { name: 'OliveDrab', hex: '6B8E23', rgb: { r: 107, g: 142, b: 35 }},
  { name: 'Orange', hex:  'FFA500', rgb: { r: 255, g: 165, b: 0 }},
  { name: 'OrangeRed', hex: 'FF4500', rgb: { r: 255, g: 69, b: 0 }},
  { name: 'Orchid', hex:  'DA70D6', rgb: { r: 218, g: 112, b: 214 }},
  { name: 'PaleGoldenRod', hex: 'EEE8AA', rgb: { r: 238, g: 232, b: 170 }},
  { name: 'PaleGreen', hex: '98FB98', rgb: { r: 152, g: 251, b: 152 }},
  { name: 'PaleTurquoise', hex: 'AFEEEE', rgb: { r: 175, g: 238, b: 238 }},
  { name: 'PaleVioletRed', hex: 'DB7093', rgb: { r: 219, g: 112, b: 147 }},
  { name: 'PapayaWhip', hex:  'FFEFD5', rgb: { r: 255, g: 239, b: 213 }},
  { name: 'PeachPuff', hex: 'FFDAB9', rgb: { r: 255, g: 218, b: 185 }},
  { name: 'Peru', hex:  'CD853F', rgb: { r: 205, g: 133, b: 63 }},
  { name: 'Pink', hex:  'FFC0CB', rgb: { r: 255, g: 192, b: 203 }},
  { name: 'Plum', hex:  'DDA0DD', rgb: { r: 221, g: 160, b: 221 }},
  { name: 'PowderBlue', hex:  'B0E0E6', rgb: { r: 176, g: 224, b: 230 }},
  { name: 'Purple', hex:  '800080', rgb: { r: 128, g: 0, b: 128 }},
  { name: 'RebeccaPurple', hex: '663399', rgb: { r: 102, g: 51, b: 153 }},
  { name: 'Red', hex: 'FF0000', rgb: { r: 255, g: 0, b: 0 }},
  { name: 'RosyBrown', hex: 'BC8F8F', rgb: { r: 188, g: 143, b: 143 }},
  { name: 'RoyalBlue', hex: '4169E1', rgb: { r: 65, g: 105, b: 225 }},
  { name: 'SaddleBrown', hex: '8B4513', rgb: { r: 139, g: 69, b: 19 }},
  { name: 'Salmon', hex:  'FA8072', rgb: { r: 250, g: 128, b: 114 }},
  { name: 'SandyBrown', hex:  'F4A460', rgb: { r: 244, g: 164, b: 96 }},
  { name: 'SeaGreen', hex: '2E8B57', rgb: { r: 46, g: 139, b: 87 }},
  { name: 'SeaShell', hex: 'FFF5EE', rgb: { r: 255, g: 245, b: 238 }},
  { name: 'Sienna', hex: 'A0522D', rgb: { r: 160, g: 82, b: 45 }},
  { name: 'Silver', hex: 'C0C0C0', rgb: { r: 192, g: 192, b: 192 }},
  { name: 'SkyBlue', hex: '87CEEB', rgb: { r: 135, g: 206, b: 235 }},
  { name: 'SlateBlue', hex: '6A5ACD', rgb: { r: 106, g: 90, b: 205 }},
  { name: 'SlateGray', hex: '708090', rgb: { r: 112, g: 128, b: 144 }},
  { name: 'SlateGrey', hex: '708090', rgb: { r: 112, g: 128, b: 144 }},
  { name: 'Snow', hex: 'FFFAFA', rgb: { r: 255, g: 250, b: 250 }},
  { name: 'SpringGreen', hex: '00FF7F', rgb: { r: 0, g: 255, b: 127 }},
  { name: 'SteelBlue', hex: '4682B4', rgb: { r: 70, g: 130, b: 180 }},
  { name: 'Tan', hex: 'D2B48C', rgb: { r: 210, g: 180, b: 140 }},
  { name: 'Teal', hex:  '008080', rgb: { r: 0, g: 128, b: 128 }},
  { name: 'Thistle', hex: 'D8BFD8', rgb: { r: 216, g: 191, b: 216 }},
  { name: 'Tomato', hex: 'FF6347', rgb: { r: 255, g: 99, b: 71 }},
  { name: 'Turquoise', hex: '40E0D0', rgb: { r: 64, g: 224, b: 208 }},
  { name: 'Violet', hex:  'EE82EE', rgb: { r: 238, g: 130, b: 238 }},
  { name: 'Wheat', hex: 'F5DEB3', rgb: { r: 245, g: 222, b: 179 }},
  { name: 'White', hex: 'FFFFFF', rgb: { r: 255, g: 255, b: 255 }},
  { name: 'WhiteSmoke', hex: 'F5F5F5', rgb: { r: 245, g: 245, b: 245 }},
  { name: 'Yellow', hex: 'FFFF00', rgb: { r: 255, g: 255, b: 0 }},
  { name: 'YellowGreen', hex:'9ACD32', rgb: { r: 154, g: 205, b: 50 }}
]

colors.forEach(item => item.hsl = RGBToHSL(item.rgb.r, item.rgb.g, item.rgb.b))

// sort
const sortedColors = computed(() => {
  if (sortby.value === 'hex') {
    return [...colors].sort((a, b) => {
      return parseInt(b.hex, 16) - parseInt(a.hex, 16)
    })
  } else if (sortby.value === 'hue') {
    return [...colors].sort((a, b) => {
      return b.hsl.h - a.hsl.h
    })
  } else if (sortby.value === 'light') {
    return [...colors].sort((a, b) => {
      return b.hsl.l - a.hsl.l
    })
  } else if (sortby.value === 'huelight') {
    return [...colors].sort((a, b) => {
      return (b.hsl.l - b.hsl.h / 360) - (a.hsl.l - a.hsl.h / 360)
    })
  }
  return colors
})

// rgb to hsl
function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) {
    h = 0
  }
  // Red is max
  else if (cmax == r) {
    h = ((g - b) / delta) % 6
  }
  // Green is max
  else if (cmax == g) {
    h = (b - r) / delta + 2
  }
  // Blue is max
  else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)
    
  // Make negative hues positive behind 360°
  if (h < 0) {
    h += 360
  }

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}
</script>

<style lang="scss">
.colors {
  font-size: 0.75rem;

  .sort-bar {
    margin-bottom: 50px;
    padding: 15px;
    background: #f0f0f0;
    text-align: right;
  }

  .color-list {
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

    .color {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 50px 1fr;
      align-items: center;
    }

    .color-box {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 5px solid #fff;
      box-shadow: 0 0 10px #0001;
      background-color: var(--color);
      border-radius: 100px;
      vertical-align: middle;
    }

    .info {
      .code {
        color: #aaa;
      }
    }
  }
}
</style>
# Vuemojis

[![NPM](https://nodei.co/npm/vuemojis.png)](https://nodei.co/npm/vuemojis/)

Vuemojis is a simple to use component for Emojis within vue. Currently it supports the following platforms: Twitter, Google, Apple & Facebook.

## Installation

Install

```sh
npm install vuemojis
# or
yarn add vuemojis
```

### main.js

```js
import Vuemojis from "vuemojis";

createApp(App).use(Vuemojis).mount("#app");
// or
createApp(App).use(Vuemojis, { name: "custom-component-name" }).mount("#app");
```

### Example

```js
<Emoji emoji="❤" platform="google" width="20" format="svg" />
```

## Options

| platform       | format   | size (PNG ONLY)                               |
| -------------- | -------- | --------------------------------------------- |
| twitter, tw    | svg, png | 320, 240, 160, 144, 72, 64 (default: 64)      |
| google, noto   | svg, png | 320, 240, 160, 144, 72 (default: 72)          |
| facebook, fb   | png      | 320, 240, 160, 144, 72 (default: 72)          |
| apple, ios     | png      | 320, 240, 160, 144, 72 (default: 72)          |
| joy, joypixels | png      | 320, 240, 160, 144, 128, 64, 32 (default: 64) |
| microsoft      | png      | 320, 240, 160, 144, 72 (default: 72)          |

## Known issues

- If you're using anything other than Twitter as platform, _some_ emojis will use Twitter emojis as fallback because they're not automatically converted to the specific unicode for that platform.

## To-do

- [ ] Fix the issue above, convert the unicode depending on the platform properly.
- [ ] Add more platforms
- [ ] Add more sizes for each platform (png)

## Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b branch-name`
3. Commit your changes: `git commit -am 'commit-message-here'`
4. Push to the branch: `git push origin branch-name`
5. Submit a pull request

## Credits

Robert (@treboryx) - me!

- https://github.com/iamcal/emoji-data - Emoji assets
- https://github.com/googlefonts/noto-emoji - Noto Emoji
- https://github.com/twitter/twemoji - Twemoji
- https://github.com/joypixels/emoji-assets - JoyPixels
- https://www.jsdelivr.com/ - CDN

## License

MIT License

Copyright (c) 2022 treboryx.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

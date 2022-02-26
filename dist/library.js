'use strict';

var vue = require('vue');

function toCodePoints(unicode, vs, long) {
  if (vs) unicode = unicode.indexOf(String.fromCharCode(0x200d)) < 0 ? unicode.replace(/\uFE0F/g, "") : unicode;
  const points = [];
  let char = 0;
  let previous = 0;
  let i = 0;
  while (i < unicode.length) {
    char = unicode.charCodeAt(i++);
    if (previous) {
      let str = (0x10000 + ((previous - 0xd800) << 10) + (char - 0xdc00)).toString(16);
      if (long && str.length < 4) str = "00" + str;
      points.push(str);
      previous = 0;
    } else if (char > 0xd800 && char <= 0xdbff) {
      previous = char;
    } else {
      let str = char.toString(16);
      if (long && str.length < 4) str = "00" + str;
      points.push(str);
    }
  }
  return points;
}

function toCodePointsGoogle(unicode) {
  let str = unicode.codePointAt(0).toString(16);
  if (str.length < 4) str = "00" + str;
  return str;
}

var script = {
  props: {
    emoji: String,
    platform: String,
    format: String,
    size: String,
  },
  computed: {
    vImage() {
      switch (this.vPlatform) {
        case "twitter":
        case "tw":
          return toCodePoints(this.emoji, true).join("-");
        case "facebook":
        case "fb":
        case "apple":
        case "ios":
          return toCodePoints(this.emoji, false, false).join("-");
        case "microsoft":
          return toCodePoints(this.emoji, false, false).join("-");
        case "google":
        case "noto":
        case "joy":
        case "joypixels":
          return toCodePointsGoogle(this.emoji);
        default:
          return this.emoji.codePointAt(0).toString(16);
      }
    },
    vSrc() {
      switch (this.vPlatform) {
        case "microsoft":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/microsoft/${this.vSize}/${this.vImage}.png`;
        case "twitter":
        case "tw":
          switch (this.vFormat) {
            case "svg":
              return `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/${this.vImage}.svg`;
            case "png":
              return `https://cdn.jsdelivr.net/gh/emojes/assets@master/twitter/${this.vSize}/${this.vImage}.png`;
          }
        case "ios":
        case "apple":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/apple/${this.vSize}/${this.vImage}.png`;
        case "google":
        case "noto":
          switch (this.vFormat) {
            case "svg":
              return `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@master/svg/emoji_u${this.vImage}.svg`;
            case "png":
              return `https://cdn.jsdelivr.net/gh/emojes/assets@master/google/${this.vSize}/emoji_u${this.vImage}.png`;
          }
        case "facebook":
        case "fb":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/facebook/${this.vSize}/${this.vImage}.png`;
        case "joy":
        case "joypixels":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/joypixels/${this.vSize}/${this.vImage}.png`;
        default:
          return `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/${this.vImage}.svg`;
      }
    },
    vPlatform() {
      return this.platform || "twitter";
    },
    vFormat() {
      return this.format || "svg";
    },
    vFallback() {
      switch (this.vFormat) {
        case "svg":
          return `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/${toCodePoints(this.emoji, true).join(
            "-"
          )}.svg`;
        case "png":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/twitter/${this.vSize}/${toCodePoints(
            this.emoji,
            true
          ).join("-")}.png`;
      }
    },
    vSize() {
      if (this.size) return this.size;
      switch (this.vPlatform) {
        case "twitter":
        case "tw":
        case "joy":
        case "joypixels":
          return "64";
        case "facebook":
        case "fb":
        case "ios":
        case "apple":
        case "google":
        case "noto":
        case "microsoft":
          return "72";
        default:
          return "72";
      }
    },
  },
  methods: {
    fallbackHandler(e) {
      const img = new Image();
      img.src = this.vFallback;
      img.onload = () => {
        e.target.src = img.src;
      };
      img.onerror = () => {
        e.target.src = "https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/2754.svg";
      };
    },
  },
};

const _hoisted_1 = ["src", "alt"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("img", vue.mergeProps(_ctx.$attrs, {
    src: $options.vSrc,
    alt: $props.emoji,
    onError: _cache[0] || (_cache[0] = (...args) => ($options.fallbackHandler && $options.fallbackHandler(...args)))
  }), null, 16 /* FULL_PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/vuemoji.vue";

const plugin = {
  install(Vue, options) {
    Vue.component(options?.name || "Emoji", script);
  },
};

module.exports = plugin;

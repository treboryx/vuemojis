<template>
  <img v-bind="$attrs" :src="vSrc" :alt="emoji" @error="fallbackHandler" />
</template>

<script>
import { toCodePoints, toCodePointsGoogle } from "./utils";
export default {
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
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/microsoft/png/${this.vSize}/${this.vImage}.png`;
        case "twitter":
        case "tw":
          switch (this.vFormat) {
            case "svg":
              return `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/${this.vImage}.svg`;
            case "png":
              return `https://cdn.jsdelivr.net/gh/emojes/assets@master/twitter/png/${this.vSize}/${this.vImage}.png`;
          }
        case "ios":
        case "apple":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/apple/png/${this.vSize}/${this.vImage}.png`;
        case "google":
        case "noto":
          switch (this.vFormat) {
            case "svg":
              return `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@master/svg/emoji_u${this.vImage}.svg`;
            case "png":
              return `https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@master/png/${this.vSize}/emoji_u${this.vImage}.png`;
          }
        case "facebook":
        case "fb":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/facebook/png/${this.vSize}/${this.vImage}.png`;
        case "joy":
        case "joypixels":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/joypixels/png/${this.vSize}/${this.vImage}.png`;
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
          return `https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/${toCodePoints(
            this.emoji,
            true
          ).join("-")}.svg`;
        case "png":
          return `https://cdn.jsdelivr.net/gh/emojes/assets@master/twitter/png/${
            this.vSize
          }/${toCodePoints(this.emoji, true).join("-")}.png`;
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
        e.target.src =
          "https://cdn.jsdelivr.net/gh/twitter/twemoji@master/assets/svg/2754.svg";
      };
    },
  },
};
</script>

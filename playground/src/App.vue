<script setup>
import { ref, nextTick } from "vue";
import unicodes from "./assets/emoji";
import platformArray from "./components/platforms";
import Emoji from "./components/vuemoji.vue";

let platform = ref("microsoft");
let showEmojis = ref(true);

const platforms = ref(platformArray);

const change = async (i) => {
  showEmojis.value = false;
  platform.value = i;
  await nextTick();
  showEmojis.value = true;
};

// expose to template and other options API hooks
</script>

<template>
  <div>
    <button
      v-for="(platform, index) in platforms"
      :key="index"
      @click="change(platform)"
    >
      {{ platform }}
    </button>
    <div v-if="showEmojis" class="emoji-container">
      <Emoji
        v-for="(emoji, index) in unicodes"
        :key="index"
        width="20"
        height="20"
        style="margin: 2px"
        :emoji="emoji.emoji"
        :platform="platform"
        format="png"
      />
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";

.emoji-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>

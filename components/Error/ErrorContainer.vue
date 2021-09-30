<template>
  <div id="error-container">
    <slot>
      <v-card-title>错误</v-card-title>
    </slot>
    <slot name="content">
      <v-card-text>错误</v-card-text>
    </slot>
    <slot name="actions">
      <v-card-actions>
        <v-btn class="white--text" color="blue lighten-1" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
          返回根目录
        </v-btn>
      </v-card-actions>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorContainer extends Vue {
  private back(): void {
    this.$router.push('/')
  }
}
</script>

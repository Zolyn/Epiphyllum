<template>
  <div id="view-mode">
    <v-btn icon @click="changeMode">
      <v-icon v-text="icons[0]"></v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ViewMode extends Vue {
  private icons = ['mdi-folder-table', 'mdi-file', 'mdi-folder']

  private changeMode(): void {
    this.icons.push(this.icons.shift() as string)
  }
}
</script>

<template>
  <div id="view-mode" @click="changeViewMode">
    <v-btn icon>
      <v-icon v-text="icons[0]"></v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ViewMode } from '~/epiphyllum/utils'

@Component
export default class ViewModeSwitch extends Vue {
  private viewMode: ViewMode[] = ['all', 'directory', 'file']
  private icons = ['mdi-folder-table', 'mdi-folder', 'mdi-file']

  private changeViewMode(): void {
    this.viewMode.push(this.viewMode.shift() as ViewMode)
    this.icons.push(this.icons.shift() as string)
    this.$store.commit('epiphyllum/changeViewMode', this.viewMode[0])
  }
}
</script>

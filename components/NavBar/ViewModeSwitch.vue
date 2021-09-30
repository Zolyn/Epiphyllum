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
  private viewMode: ViewMode[] = ['list', 'table']
  private icons = [
    'mdi-format-list-bulleted-square',
    'mdi-table-large',
    // 'mdi-view-module',
  ]

  private changeViewMode(): void {
    this.viewMode.push(this.viewMode.shift() as ViewMode)
    this.icons.push(this.icons.shift() as string)
    this.$store.commit('epiphyllum/changeViewMode', this.viewMode[0])
  }
}
</script>

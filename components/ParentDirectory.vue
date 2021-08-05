<template>
  <div id="parent-directory">
    <v-list-item :disabled="isRoot" @click="goToParent">
      <v-list-item-icon>
        <v-icon v-text="icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="content"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { dirname, basename } from 'path'
import { Component } from 'vue-property-decorator'
import EpiphyllumStore from '~/epiphyllum/store'

@Component
export default class ParentDirectory extends EpiphyllumStore {
  private icon = 'mdi-arrow-left'

  private get content(): string {
    const parentDir = dirname(this.currentPath)

    if (this.currentPath === '/') {
      return '.'
    } else if (parentDir === '/') {
      return 'home'
    }

    return basename(dirname(this.currentPath))
  }

  private get isRoot(): boolean {
    return this.currentPath === '/'
  }

  private goToParent(): void {
    this.$router.push(dirname(this.currentPath))
  }
}
</script>

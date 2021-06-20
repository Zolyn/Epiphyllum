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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ParentDirectory extends Vue {
  private icon = 'mdi-arrow-left'

  private get content(): string {
    const parentDir = dirname(this.$route.path)

    if (this.$route.path === '/') {
      return '.'
    } else if (parentDir === '/') {
      return 'home'
    }

    return basename(dirname(this.$route.path))
  }

  private get isRoot(): boolean {
    return this.$route.path === '/'
  }

  private goToParent(): void {
    this.$router.push(dirname(this.$route.path))
  }
}
</script>

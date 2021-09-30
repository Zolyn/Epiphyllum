<template>
  <div id="filelist-item">
    <error-container v-if="!currentFileList.length">
      <template #content>
        <v-card-text>目录为空。</v-card-text>
      </template>
      <template #actions>
        <v-btn class="white--text" color="blue lighten-1" @click="back">
          <v-icon>mdi-arrow-left</v-icon>
          返回上一目录
        </v-btn>
      </template>
    </error-container>
    <v-list v-else :key="`list-${listKey}`">
      <v-list-item-group color="primary">
        <v-list-item :disabled="isRoot" @click="back">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="parentDirectory"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in currentFileList"
          :key="`fileListItem-${index}`"
          @click.stop="handleClick(item)"
        >
          <v-list-item-icon>
            <v-icon v-text="`mdi-${item.icon}`"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.pathname"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text v-text="item.transformedTime">
            </v-list-item-action-text>
            <v-list-item-action-text
              v-if="!item.isDir"
              v-text="item.transformedSize"
            ></v-list-item-action-text>
            <v-list-item-action-text v-else>-</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <preview-container v-model="preview"></preview-container>
  </div>
</template>

<script lang="ts">
import { join, dirname } from 'path'
import { Component } from 'vue-property-decorator'
import { FileMeta } from '~/epiphyllum/utils'
import ViewBase from '~/components/View/ViewBase'
import ErrorContainer from '~/components/Error/ErrorContainer.vue'
import PreviewContainer from '~/components/Preview/PreviewContainer.vue'

@Component({
  components: {
    PreviewContainer,
    ErrorContainer,
  },
})
export default class FileListItem extends ViewBase {
  private preview = false
  private listKey = 0

  private handleClick(item: FileMeta): void {
    const { isDir, pathname } = item
    if (isDir) {
      this.$router.push(join(this.currentPath, pathname))
    } else {
      this.$store.commit('epiphyllum/updatePreviewItem', item)
      this.listKey += 1
      this.preview = true
    }
  }

  private back(): void {
    this.$router.push(dirname(this.currentPath))
  }

  private get isRoot(): boolean {
    return this.currentPath === '/'
  }
}
</script>

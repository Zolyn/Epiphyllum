<template>
  <div id="filelist-item">
    <div v-if="!currentFileList.length" id="empty-dir">
      <v-list-item disabled>
        <v-list-item-content>
          <v-list-item-title>Info: Empty directory.</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-else id="item-list">
      <v-list-item
        v-for="(item, index) in currentFileList"
        :key="'filelist-item' + index"
        @click.stop="handleClick(item)"
      >
        <v-list-item-icon>
          <v-icon v-if="item.isDir" v-text="icons.folder"></v-icon>
          <v-icon v-else v-text="icons.file"></v-icon>
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
    </div>
  </div>
</template>

<script lang="ts">
import { join } from 'path'
import { Component } from 'vue-property-decorator'
import { FileMeta } from '~/epiphyllum/utils'
import EpiphyllumStore from '~/epiphyllum/store'

@Component
export default class FileListItem extends EpiphyllumStore {
  private icons = {
    folder: 'mdi-folder',
    file: 'mdi-file-cloud',
  }

  private handleClick({ pathname, isDir }: FileMeta): void {
    if (isDir) {
      this.$router.push(join(this.currentPath, pathname))
    } else {
      const hostClip = this.host.split('/')
      hostClip[2] = join(hostClip[2], this.currentPath, pathname)
      window.location.href = hostClip.join('/')
    }
  }
}
</script>

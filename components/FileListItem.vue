<template>
  <div v-if="currentDirMeta" id="filelist-item">
    <v-list-item
      v-for="(item, index) in handledList"
      :key="'filelistitem' + index"
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
</template>

<script lang="ts">
import { join } from 'path'
import { Component } from 'vue-property-decorator'
import { DirectoryMeta, FileMeta, FileMetaList } from '~/epiphyllum/utils'
import EpiphyllumStore from '~/epiphyllum/store'

@Component
export default class FileListItem extends EpiphyllumStore {
  private icons = {
    folder: 'mdi-folder',
    file: 'mdi-file-cloud',
  }

  get handledList(): FileMetaList {
    return this.folderList.concat(this.fileList)
  }

  private get currentDirMeta(): DirectoryMeta | undefined {
    return this.directoryMap.get(this.$route.path)
  }

  private get folderList(): FileMetaList {
    if (this.currentDirMeta) {
      return this.currentDirMeta.files.filter((val) => val.isDir)
    }

    return []
  }

  private get fileList(): FileMetaList {
    if (this.currentDirMeta) {
      return this.currentDirMeta.files.filter((val) => !val.isDir)
    }

    return []
  }

  private handleClick({ pathname, isDir }: FileMeta): void {
    if (isDir) {
      this.$router.push(join(this.$route.path, pathname))
    } else {
      alert('Coming soon')
    }
  }
}
</script>

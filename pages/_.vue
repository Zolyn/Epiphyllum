<template>
  <div id="epiphyllum">
    <v-card elevation="10" rounded="lg">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="11">
            <v-slide-x-transition hide-on-leave>
              <error-container v-if="initFailed || noData">
                <template #content>
                  <v-card-text v-if="initFailed"> 初始化失败。 </v-card-text>
                  <v-card-text v-else> 没有这样的文件或目录。 </v-card-text>
                </template>
              </error-container>
              <component :is="getComponent" v-else></component>
            </v-slide-x-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { dirname, basename } from 'path'
import { Component } from 'vue-property-decorator'
import { ViewMode } from '~/epiphyllum/utils'
import FileListItem from '~/components/View/FileListItem.vue'
import FileTable from '~/components/View/FileTable.vue'
import ErrorContainer from '~/components/Error/ErrorContainer.vue'
import EpiphyllumFetch from '~/epiphyllum/fetch'

@Component({
  components: {
    FileListItem,
    FileTable,
    ErrorContainer,
  },
})
export default class FileIndexPage extends EpiphyllumFetch {
  private noData = false
  private initFailed = false
  private viewModeMap: Map<ViewMode, string> = new Map([
    ['list', 'FileListItem'],
    ['table', 'FileTable'],
  ])

  private mounted(): void {
    console.log(this.currentPath)
    if (!this.isInitialized) {
      this.initFailed = true
      return
    }

    if (this.pathList.includes(this.currentPath)) {
      return
    }

    const dirMeta = this.directoryMap.get(dirname(this.currentPath))

    if (!dirMeta) {
      this.noData = true
      return
    }

    const fileNameList = dirMeta.files
      .filter(({ isDir }) => !isDir)
      .map(({ pathname }) => pathname)

    if (!fileNameList.includes(basename(this.currentPath))) {
      this.noData = true
      return
    }

    window.open(this.downloadLink)
  }

  private get getComponent(): string {
    return this.viewModeMap.get(this.viewMode) ?? 'FileListItem'
  }
}
</script>

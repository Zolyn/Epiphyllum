<template>
  <div id="epiphyllum">
    <v-card elevation="10" rounded="lg">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="11">
            <v-list>
              <v-list-item-group color="primary">
                <div v-if="noData" id="err-no-data">
                  <v-list-item disabled>
                    <v-list-item-content>
                      <v-list-item-title
                        >Error: No such file or directory.</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div v-else-if="initFailed" id="err-init-failed">
                  <v-list-item disabled>
                    <v-list-item-content>
                      <v-list-item-title
                        >Error: Initialization failed.</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div v-else id="view-wrapper">
                  <parent-directory></parent-directory>
                  <file-list-item></file-list-item>
                </div>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { dirname, basename, join } from 'path'
import { Component } from 'vue-property-decorator'
import FileListItem from '~/components/FileListItem.vue'
import ParentDirectory from '~/components/ParentDirectory.vue'
import EpiphyllumFetch from '~/epiphyllum/fetch'

@Component({
  components: {
    FileListItem,
    ParentDirectory,
  },
})
export default class FileIndexPage extends EpiphyllumFetch {
  private noData = false
  private initFailed = false

  private mounted(): void {
    console.log(this.currentPath)
    if (this.pathList.includes(this.currentPath)) {
      return
    } else if (!this.isInitialized) {
      this.initFailed = true
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

    const hostClip = this.host.split('/')
    hostClip[2] = join(hostClip[2], this.currentPath)
    window.location.href = hostClip.join('/')
  }
}
</script>

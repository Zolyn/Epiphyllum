<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-list>
        <v-list-item-group color="primary">
          <file-list-item
            :list="currentFolderList"
            :icon="icons.folder"
            :custom-event="'changepath'"
            @changepath="changePath"
          ></file-list-item>
          <file-list-item
            :list="currentFileList"
            :icon="icons.file"
            :custom-event="'download'"
            @download="downloadFile"
          ></file-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { join } from 'path'
import { Component, Vue } from 'vue-property-decorator'
import {
  awaitHelper,
  DirectoryMap,
  FileMeta,
  Files,
  LiteLogger as Logger,
} from '~/epiphyllum/utils'
import { EpiphyllumEntry } from '~/epiphyllum/main'
import FileListItem from '~/components/FileListItem.vue'

@Component({
  async fetch({ store }) {
    const isInitialized: boolean = store.state.epiphyllum.isInitialized

    if (isInitialized) {
      Logger.info('No more initialization.')
      return
    }

    const [epiphyllumErr, result] = await awaitHelper(EpiphyllumEntry())

    if (!result) {
      Logger.err(epiphyllumErr)
      return
    }

    store.commit('epiphyllum/setDirMap', result)
    store.commit('epiphyllum/initialize')
  },
  components: {
    FileListItem,
  },
})
export default class FileIndexPage extends Vue {
  private icons = {
    folder: 'mdi-folder',
    file: 'mdi-file-cloud',
  }

  private get directoryMap(): DirectoryMap {
    return this.$store.state.epiphyllum.directoryMap as DirectoryMap
  }

  private get currentDirMeta(): FileMeta | undefined {
    return this.directoryMap.get(this.$route.path)
  }

  private get currentFolderList(): Files | undefined {
    return this.currentDirMeta?.files?.filter((val) => val.isDir)
  }

  private get currentFileList(): Files | undefined {
    return this.currentDirMeta?.files?.filter((val) => !val.isDir)
  }

  private changePath({ pathname }: FileMeta) {
    this.$router.push(join(this.$route.path, pathname))
  }

  private downloadFile() {
    alert('Unsupported function.')
  }
}
</script>

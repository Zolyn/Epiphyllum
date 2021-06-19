<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-list>
        <v-list-item-group color="primary">
          <file-list-item
            :list="folderList"
            :icon="icons.folder"
            :custom-event="events.changeDir"
            @cd="changeDirectory"
          ></file-list-item>
          <file-list-item
            :list="fileList"
            :icon="icons.file"
            :custom-event="events.download"
            @dl="downloadFile"
          ></file-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FileMeta, Files } from '~/scripts/generateDirTree'
import FileListItem from '~/components/FileListItem.vue'

@Component({
  components: {
    FileListItem,
  },
})
export default class Test extends Vue {
  private currentViewList = this.$dirTree
  private icons = {
    folder: 'mdi-folder',
    file: 'mdi-file-cloud',
  }

  private events = {
    changeDir: 'cd',
    download: 'dl',
  }

  private get folderList(): Files | undefined {
    return this.currentViewList.files?.filter((val) => val.isDir)
  }

  private get fileList(): Files | undefined {
    return this.currentViewList.files?.filter((val) => !val.isDir)
  }

  private changeDirectory(item: FileMeta): void {
    this.currentViewList = item
  }

  private downloadFile(): void {
    alert(`Epiphyllum hasn't supported this function yet.`)
  }
}
</script>

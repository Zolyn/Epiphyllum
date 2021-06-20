<template>
  <div v-if="list && icon" id="filelist-item">
    <v-list-item
      v-for="(item, index) in list"
      :key="index"
      @click.stop="handleClick(item)"
    >
      <v-list-item-icon>
        <v-icon v-text="icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.pathname"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text v-text="item.time"> </v-list-item-action-text>
        <v-list-item-action-text
          v-if="!item.isDir"
          v-text="item.size"
        ></v-list-item-action-text>
        <v-list-item-action-text v-else>-</v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { join } from 'path'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FileMeta, FileMetaList } from '~/epiphyllum/utils'

@Component
export default class FileListItem extends Vue {
  @Prop({ required: true })
  private readonly list: FileMetaList | undefined

  @Prop({ type: String, required: true })
  private readonly icon: string | undefined

  private handleClick({ pathname, isDir }: FileMeta): void {
    if (isDir) {
      this.$router.push(join(this.$route.path, pathname))
    } else {
      alert('Coming soon')
    }
  }
}
</script>

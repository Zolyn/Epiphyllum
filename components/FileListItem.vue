<template>
  <div v-if="list && icon && customEvent" id="filelist-item">
    <v-list-item
      v-for="(item, index) in list"
      :key="index"
      @click.stop="$emit(customEvent, item)"
    >
      <v-list-item-icon>
        <v-icon v-text="icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.pathname"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Files } from '~/epiphyllum/utils'

@Component
export default class FileListItem extends Vue {
  @Prop({ required: true })
  private readonly list: Files | undefined

  @Prop({ type: String, required: true })
  private readonly icon: string | undefined

  @Prop({ type: String, required: true })
  private readonly customEvent: string | undefined
}
</script>

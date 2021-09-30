<template>
  <div id="preview-container">
    <v-dialog :value="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          <div class="d-inline-block text-truncate">
            <v-icon v-text="`mdi-${previewItem.icon}`"></v-icon>
            {{ previewItem.pathname }}
          </div>
        </v-card-title>
        <component :is="`${previewItem.type}-preview`"></component>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updatePreviewStatus">
            关闭
          </v-btn>
          <v-btn color="blue darken-1" text @click="download">下载</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, VModel } from 'vue-property-decorator'
import ViewBase from '~/components/View/ViewBase'
import ImagePreview from '~/components/Preview/ImagePreview.vue'

@Component({
  components: {
    ImagePreview,
  },
})
export default class PreviewContainer extends ViewBase {
  @VModel({ type: Boolean })
  private dialog!: boolean

  private updatePreviewStatus(): void {
    this.dialog = false
  }

  private download(): void {
    this.dialog = false
    this.downloadFile().catch((err) => console.error(err))
  }
}
</script>

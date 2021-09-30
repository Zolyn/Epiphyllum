import { Component } from 'vue-property-decorator'
import EpiphyllumStore from '~/epiphyllum/store'
import { awaitHelper, E } from '~/epiphyllum/utils'

@Component
export default class ViewBase extends EpiphyllumStore {
  protected async downloadFile(): Promise<void> {
    const [dataErr, res] = await awaitHelper(
      this.$axios.$get(this.downloadLink, {
        responseType: 'blob',
        onDownloadProgress(progress: ProgressEvent) {
          console.log(
            Math.round((progress.loaded / progress.total) * 100) + '%'
          )
        },
      })
    )

    if (!res) {
      throw E(dataErr)
    }

    const blob = new Blob([res], { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = this.previewItem.pathname
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

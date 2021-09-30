<template>
  <div id="file-table">
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :custom-sort="sortItems"
      hide-default-footer
      @click:row="handleClick"
      @page-count="pageCount = $event"
    >
      <!-- eslint-disable-next-line -->
      <template #item.pathname="{ item }">
        <v-icon v-text="`mdi-${item.icon}`"></v-icon>
        &nbsp;&nbsp;&nbsp;&nbsp;{{ item.pathname }}
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.time="{ item }">
        {{ item.transformedTime }}
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.size="{ item }">
        {{ item.transformedSize }}
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
      total-visible="5"
    ></v-pagination>
    <preview-container v-model="preview"></preview-container>
  </div>
</template>

<script lang="ts">
import { dirname, join } from 'path'
import { Component } from 'vue-property-decorator'
import { DataTableHeader, DataTableCompareFunction } from 'vuetify'
import { getObjectValueByPath } from '~/epiphyllum/utils/vuetify-helpers'
import ViewBase from '~/components/View/ViewBase'
import { FileMeta } from '~/epiphyllum/utils'
import PreviewContainer from '~/components/Preview/PreviewContainer.vue'

interface FileTableItem extends FileMeta {
  isParent: boolean
}

@Component({
  components: {
    PreviewContainer,
  },
})
export default class FileTable extends ViewBase {
  private page = 1
  private pageCount = 0
  private preview = false

  private headers: DataTableHeader[] = [
    {
      text: '文件名',
      value: 'pathname',
      align: 'start',
      sortable: true,
    },
    {
      text: '日期',
      value: 'time',
      align: 'center',
      sortable: true,
    },
    {
      text: '大小',
      value: 'size',
      align: 'center',
      sortable: true,
    },
  ]

  private handleClick(item: FileTableItem): void {
    const { isParent, isDir, pathname } = item
    if (isParent && this.currentPath !== '/') {
      this.$router.push(dirname(this.currentPath))
    } else if (isDir && !isParent) {
      this.$router.push(join(this.currentPath, pathname))
    } else if (!isDir) {
      this.$store.commit('epiphyllum/updatePreviewItem', item)
      this.preview = true
    }
  }

  private get items(): FileTableItem[] {
    const parentDir: FileTableItem = {
      isParent: true,
      pathname: this.parentDirectory,
      icon: 'arrow-left',
      type: 'folder',
      isDir: true,
      time: 0,
      size: 0,
      transformedTime: '-',
      transformedSize: '-',
    }

    return [parentDir].concat(
      this.currentFileList.map((val) => ({ isParent: false, ...val }))
    )
  }

  private sortItems(
    items: FileTableItem[],
    sortBy: string[],
    sortDesc: boolean[],
    locale: string,
    customSorters?: Record<string, DataTableCompareFunction<FileTableItem>>
  ): FileTableItem[] {
    if (sortBy === null || !sortBy.length) return items
    const stringCollator = new Intl.Collator(locale, {
      sensitivity: 'accent',
      usage: 'sort',
    })

    const parentDir = items.shift() as FileTableItem
    return [parentDir].concat(
      items.sort((a, b) => {
        for (let i = 0; i < sortBy.length; i++) {
          const sortKey = sortBy[i]

          let sortA = getObjectValueByPath(a, sortKey)
          let sortB = getObjectValueByPath(b, sortKey)

          if (sortDesc[i]) {
            ;[sortA, sortB] = [sortB, sortA]
          }

          if (customSorters && customSorters[sortKey]) {
            const customResult = customSorters[sortKey](sortA, sortB)

            if (!customResult) continue

            return customResult
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            continue
          }

          ;[sortA, sortB] = [sortA, sortB].map((s) =>
            (s || '').toString().toLocaleLowerCase()
          )

          if (sortA !== sortB) {
            if (!isNaN(sortA) && !isNaN(sortB))
              return Number(sortA) - Number(sortB)
            return stringCollator.compare(sortA, sortB)
          }
        }

        return 0
      })
    )
  }
}
</script>

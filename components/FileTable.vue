<template>
  <div id="file-table">
    <!--    <v-data-table :headers="headers" :items="items"></v-data-table>-->
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { DataTableHeader } from 'vuetify'
import EpiphyllumStore from '~/epiphyllum/store'

// interface FileTableItem extends Record<'filename' | 'time' | 'size', string> {}

@Component
export default class FileTable extends EpiphyllumStore {
  private headers: DataTableHeader[] = [
    {
      text: '文件名',
      value: 'filename',
      align: 'start',
      sortable: false,
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

  // private get items(): FileTableItem[] {
  //
  // }
}
</script>

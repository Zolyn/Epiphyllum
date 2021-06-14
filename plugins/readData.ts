import Vue from 'vue'
import { FileMeta } from '~/scripts/generateDirTree'
import data from '~/assets/data.json'

declare module 'vue/types/vue' {
  interface Vue {
    $dirTree: FileMeta
  }
}

Vue.prototype.$dirTree = data as FileMeta

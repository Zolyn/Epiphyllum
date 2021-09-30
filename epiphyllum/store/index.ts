import { Component, Vue } from 'vue-property-decorator'
import { createNamespacedHelpers } from 'vuex'
import {
  DirectoryMap,
  FileMeta,
  FileMetaList,
  SortMode,
  ViewMode,
} from '~/epiphyllum/utils'

const { mapState, mapGetters } = createNamespacedHelpers('epiphyllum')
const stateArray = [
  'directoryMap',
  'isInitialized',
  'sortMode',
  'viewMode',
  'currentPath',
  'previewItem',
]
const getterArray = [
  'parentDirectory',
  'pathList',
  'currentFileList',
  'downloadLink',
]

@Component({
  computed: {
    ...mapState(stateArray),
    ...mapGetters(getterArray),
  },
})
export default class EpiphyllumStore extends Vue {
  protected directoryMap!: DirectoryMap
  protected isInitialized!: boolean
  protected sortMode!: SortMode
  protected viewMode!: ViewMode
  protected currentPath!: string
  protected currentFileList!: FileMetaList
  protected pathList!: string[]
  protected parentDirectory!: string
  protected previewItem!: FileMeta
  protected downloadLink!: string
}

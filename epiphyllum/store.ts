import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { DirectoryMap, SortMode, ViewMode } from '~/epiphyllum/utils'

@Component({
  computed: mapState('epiphyllum', {
    // @ts-ignore
    directoryMap: (state) => state.directoryMap,
    // @ts-ignore
    viewMode: (state) => state.viewMode,
    // @ts-ignore
    sortMode: (state) => state.sortMode,
  }),
})
export default class EpiphyllumStore extends Vue {
  protected directoryMap!: DirectoryMap
  protected viewMode!: ViewMode
  protected sortMode!: SortMode
}

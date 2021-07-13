import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import {
  DirectoryMap,
  SortMode,
  generateStateMap,
  ViewMode,
} from '~/epiphyllum/utils'

const stateArray = ['directoryMap', 'sortMode', 'viewMode']

@Component({
  computed: mapState('epiphyllum', generateStateMap(stateArray)),
})
export default class EpiphyllumStore extends Vue {
  protected directoryMap!: DirectoryMap
  protected sortMode!: SortMode
  protected viewMode!: ViewMode
}

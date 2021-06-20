import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import {
  awaitHelper,
  DirectoryMap,
  LiteLogger as Logger,
} from '~/epiphyllum/utils'
import { EpiphyllumEntry } from '~/epiphyllum/main'

@Component({
  async fetch({ store }) {
    const isInitialized: boolean = store.state.epiphyllum.isInitialized
    if (isInitialized) {
      Logger.info('No more initialization.')
      return
    }

    const [epiphyllumErr, result] = await awaitHelper(EpiphyllumEntry())

    if (!result) {
      Logger.err(epiphyllumErr)
      return
    }

    store.commit('epiphyllum/setDirMap', result)
    store.commit('epiphyllum/initialize')
  },
  computed: mapState('epiphyllum', {
    // @ts-ignore
    directoryMap: (state) => state.directoryMap,
  }),
})
export default class EpiphyllumFetch extends Vue {
  protected directoryMap!: DirectoryMap
}

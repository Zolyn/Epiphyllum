import { Component } from 'vue-property-decorator'
import { awaitHelper, LiteLogger as Logger } from '~/epiphyllum/utils'
import { EpiphyllumEntry } from '~/epiphyllum/main'
import EpiphyllumStore from '~/epiphyllum/store'

@Component({
  async fetch({ store, route }) {
    const isInitialized: boolean = store.state.epiphyllum.isInitialized
    if (isInitialized) {
      Logger.info('No more initialization.')
      return
    }

    const [epiphyllumErr, val] = await awaitHelper(EpiphyllumEntry())

    if (!val) {
      Logger.err(epiphyllumErr)
      return
    }

    const { host, result } = val

    store.commit('epiphyllum/setDirMap', result)
    store.commit('epiphyllum/setHost', host)
    store.commit('epiphyllum/updatePath', route.path)
    store.commit('epiphyllum/initialize')
  },
})
export default class EpiphyllumFetch extends EpiphyllumStore {}

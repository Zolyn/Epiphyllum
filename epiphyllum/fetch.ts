import { Component } from 'vue-property-decorator'
import { awaitHelper, LiteLogger as Logger } from '~/epiphyllum/utils'
import { EpiphyllumEntry } from '~/epiphyllum/main'
import EpiphyllumStore from '~/epiphyllum/store'

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
})
export default class EpiphyllumFetch extends EpiphyllumStore {}

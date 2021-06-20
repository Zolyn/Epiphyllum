import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { DirectoryMap } from '~/epiphyllum/utils'

@Component({
  computed: mapState('epiphyllum', {
    // @ts-ignore
    directoryMap: (state) => state.directoryMap,
  }),
})
export default class EpiphyllumStore extends Vue {
  protected directoryMap!: DirectoryMap
}

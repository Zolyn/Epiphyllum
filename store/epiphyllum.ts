import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { DirectoryMap } from '~/epiphyllum/utils'

@Module({
  name: 'epiphyllum',
  stateFactory: true,
  namespaced: true,
})
export default class Epiphyllum extends VuexModule {
  private directoryMap: DirectoryMap = new Map()
  private isInitialized: boolean = false

  @Mutation
  private setDirMap(map: DirectoryMap): void {
    this.directoryMap = map
  }

  @Mutation
  private initialize(): void {
    this.isInitialized = true
  }
}

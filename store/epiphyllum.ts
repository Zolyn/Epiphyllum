import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  ColorScheme,
  DirectoryMap,
  SortMode,
  ViewMode,
} from '~/epiphyllum/utils'

@Module({
  name: 'epiphyllum',
  stateFactory: true,
  namespaced: true,
})
export default class Epiphyllum extends VuexModule {
  private directoryMap: DirectoryMap = new Map()
  private isInitialized: boolean = false
  private viewMode: ViewMode = 'all'
  private sortMode: SortMode = 'normal'
  private preferColorScheme: ColorScheme = 'system'

  @Mutation
  private setDirMap(map: DirectoryMap): void {
    this.directoryMap = map
  }

  @Mutation
  private initialize(): void {
    this.isInitialized = true
  }

  @Mutation
  private changeViewMode(mode: ViewMode): void {
    this.viewMode = mode
  }

  @Mutation
  private changeSortMode(mode: SortMode): void {
    this.sortMode = mode
  }

  @Mutation
  private changeColorScheme(scheme: ColorScheme): void {
    this.preferColorScheme = scheme
  }
}

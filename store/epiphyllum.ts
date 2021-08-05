import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  DirectoryMap,
  FileMetaList,
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
  private sortMode: SortMode = 'normal'
  private viewMode: ViewMode = 'all'
  private currentPath = '/'
  private host = 'www.exampledomain.com'

  @Mutation
  private setDirMap(map: DirectoryMap): void {
    this.directoryMap = map
  }

  @Mutation
  private initialize(): void {
    this.isInitialized = true
  }

  @Mutation
  private changeSortMode(mode: SortMode): void {
    this.sortMode = mode
  }

  @Mutation
  private changeViewMode(mode: ViewMode): void {
    this.viewMode = mode
  }

  @Mutation
  private updatePath(path: string): void {
    this.currentPath = decodeURIComponent(path)
  }

  @Mutation
  private setHost(host: string): void {
    this.host = host
  }

  private get currentFileList(): FileMetaList {
    const directoryMeta = this.directoryMap.get(this.currentPath)
    if (!directoryMeta) {
      return []
    }

    const folderList = directoryMeta.files.filter((val) => val.isDir)
    const fileList = directoryMeta.files.filter((val) => !val.isDir)
    return [folderList, fileList]
      .map((list) => {
        switch (this.sortMode) {
          case 'time-asc':
            return list.sort((a, b) => a.time - b.time)
          case 'time-desc':
            return list.sort((a, b) => b.time - a.time)
          case 'size-asc':
            return list.sort((a, b) => a.size - b.size)
          case 'size-desc':
            return list.sort((a, b) => b.size - a.size)
          default:
            return list
        }
      })
      .flat()
  }

  private get pathList(): string[] {
    return [...this.directoryMap].map(([path]) => path)
  }
}

import { basename, dirname, join } from 'path'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  DirectoryMap,
  FileMeta,
  FileMetaList,
  SortMode,
  ViewMode,
} from '~/epiphyllum/utils'

type SortKey = 'time' | 'size'

@Module({
  name: 'epiphyllum',
  stateFactory: true,
  namespaced: true,
})
export default class Epiphyllum extends VuexModule {
  private directoryMap: DirectoryMap = new Map()
  private isInitialized: boolean = false
  private sortMode: SortMode = 'normal'
  private viewMode: ViewMode = 'list'
  private currentPath = '/'
  private host = 'www.exampledomain.com'
  private previewItem: FileMeta = {
    isDir: false,
    pathname: '',
    type: 'file',
    icon: 'file-cloud',
    time: 0,
    size: 0,
    transformedTime: '-',
    transformedSize: '-',
  }

  @Mutation
  private setDirMap(map: DirectoryMap): void {
    this.directoryMap = map
  }

  @Mutation
  private setHost(host: string): void {
    this.host = host
  }

  @Mutation
  private setInitializationStatus(): void {
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
  private updatePreviewItem(item: FileMeta): void {
    this.previewItem = item
  }

  private get downloadLink(): string {
    const hostClip = this.host.split('/')
    hostClip[2] = join(hostClip[2], this.currentPath, this.previewItem.pathname)
    return hostClip.join('/')
  }

  private get parentDirectory(): string {
    const parentDir = dirname(this.currentPath)

    if (this.currentPath === '/') {
      return '.'
    } else if (parentDir === '/') {
      return 'home'
    }

    return basename(dirname(this.currentPath))
  }

  private get currentFileList(): FileMetaList {
    const directoryMeta = this.directoryMap.get(this.currentPath)
    if (!directoryMeta) {
      return []
    }

    const folderList = directoryMeta.files.filter((val) => val.isDir)
    const fileList = directoryMeta.files.filter((val) => !val.isDir)

    switch (this.viewMode) {
      case 'list':
        return [folderList, fileList]
          .map((list) => {
            let key: SortKey
            if (this.sortMode.match('time')) {
              key = 'time'
            } else {
              key = 'size'
            }

            if (this.sortMode === 'normal') {
              return list
            }

            return list.sort((a, b) => {
              if (this.sortMode.match('desc')) {
                ;[a, b] = [b, a]
              }

              if (this.sortMode.match('name')) {
                return a.pathname.localeCompare(b.pathname, 'zh')
              }

              return a[key] - b[key]
            })
          })
          .flat()
      case 'table':
        return folderList.concat(fileList)
      default:
        return folderList.concat(fileList)
    }
  }

  private get pathList(): string[] {
    return [...this.directoryMap].map(([path]) => path)
  }
}

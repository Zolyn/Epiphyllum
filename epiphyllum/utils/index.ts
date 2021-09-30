import { extname } from 'path'

interface FileMeta {
  isDir: boolean
  pathname: string
  type: string
  icon: string
  time: number
  size: number
  transformedTime: string
  transformedSize: string
}

interface DirectoryMeta {
  pathname: string
  files: FileMeta[]
}

interface FileType {
  suffix: string[]
  type: string
  icon: string
}

type FileMetaList = FileMeta[]

type DirectoryMap = Map<string, DirectoryMeta>

interface BreadCrumbItem {
  text: string
  disabled: boolean
  href: string
}

type BreadCrumbs = BreadCrumbItem[]

type SortMode =
  | 'normal'
  | 'time-asc'
  | 'time-desc'
  | 'size-asc'
  | 'size-desc'
  | 'name-asc'
  | 'name-desc'

interface GroupItem {
  title: string
  mode: SortMode
  icon: string
}

interface Group {
  title: string
  prependIcon: string
  items: GroupItem[]
}

type ColorScheme = 'system' | 'light' | 'dark'

type ViewMode = 'list' | 'table'

/**
 * await帮助函数，帮助捕获异常
 * 由于只需要关心结果是否存在，err始终为string
 */
function awaitHelper<T>(promise: Promise<T>): Promise<[string, T | null]> {
  return promise
    .then<[string, T]>((res) => ['', res])
    .catch<[string, null]>((err) => [err, null])
}

function formatTime(time: number): string {
  if (time < 10) {
    return '0' + time
  } else {
    return time.toString()
  }
}

function transformTime(time: number): string {
  const transformedRawDate = new Date(time * 1000)
  const year = transformedRawDate.getFullYear()
  const month = transformedRawDate.getMonth() + 1
  const date = transformedRawDate.getDate()
  const hour = transformedRawDate.getHours()
  const minute = transformedRawDate.getMinutes()
  const second = transformedRawDate.getSeconds()

  return `${year}-${month}-${date} ${hour}:${formatTime(minute)}:${formatTime(
    second
  )}`
}

function transformBytes(bytes: number): string {
  const unit = ['B', 'KB', 'MB', 'GB']
  let result = '-'

  unit.reduce((prev, val) => {
    if (!prev) {
      return prev
    }

    const transformedBytes = parseFloat((bytes / prev).toFixed(2))

    if (transformedBytes < 1024 || val === 'GB') {
      result = `${transformedBytes} ${val}`
      return 0
    }

    return prev * 1024
  }, 1)

  return result
}

const E = (err: string) => new Error(err)

const TE = (err: string) => new TypeError(err)

interface Logger {
  info: (msg: string) => void
  err: (msg: unknown) => void
  debug: (msg: unknown) => void
  throw: (msg: string) => never
}

const LiteLogger: Logger = {
  info: (msg) => console.log(msg),
  err: (msg) => console.error(msg),
  debug: (msg) => console.log(msg),
  throw: (msg) => {
    throw new Error(msg)
  },
}

const fileTypeMap: FileType[] = [
  {
    suffix: ['txt', 'log', 'out'],
    type: 'text',
    icon: 'node-text',
  },
  {
    suffix: ['png', 'jpg', 'webm', 'gif'],
    type: 'image',
    icon: 'file-image',
  },
  {
    suffix: ['doc', 'docx'],
    type: 'word',
    icon: 'file-word',
  },
  {
    suffix: ['xls', 'xlsx', 'et'],
    type: 'excel',
    icon: 'file-excel',
  },
  {
    suffix: ['ppt', 'pptx'],
    type: 'powerpoint',
    icon: 'file-powerpoint',
  },
  {
    suffix: ['zip', 'rar', '7z', 'tar', 'gz', 'zst', 'lzma', 'iso', 'jar'],
    type: 'zip',
    icon: 'zip-box',
  },
  {
    suffix: ['mp4', 'mkv', 'wmv', 'flv'],
    type: 'video',
    icon: 'file-video',
  },
  {
    suffix: ['mp3', 'ogg', 'wav', 'aac'],
    type: 'music',
    icon: 'file-music',
  },
  {
    suffix: ['pdf'],
    type: 'pdf',
    icon: 'file-pdf',
  },
  {
    suffix: ['md'],
    type: 'markdown',
    icon: 'language-markdown',
  },
  {
    suffix: ['js'],
    type: 'javascript',
    icon: 'language-javascript',
  },
  {
    suffix: ['ts'],
    type: 'typescript',
    icon: 'language-typescript',
  },
  {
    suffix: ['vue'],
    type: 'vue',
    icon: 'vuejs',
  },
  {
    suffix: ['css'],
    type: 'css',
    icon: 'language-css-3',
  },
  {
    suffix: ['json'],
    type: 'json',
    icon: 'code-json',
  },
]

const transformedFileTypeMap: Map<string, FileType> = new Map(
  fileTypeMap
    .map((val) => val.suffix.map<[string, FileType]>((suffix) => [suffix, val]))
    .flat()
)

function getFileTypeAndIcon(name: string): FileType {
  const fileTypeObject = transformedFileTypeMap.get(extname(name).slice(1))
  const normalFile: FileType = {
    suffix: [],
    type: 'file',
    icon: 'file-cloud',
  }

  return fileTypeObject ?? normalFile
}

export {
  awaitHelper,
  LiteLogger,
  FileMeta,
  DirectoryMeta,
  FileMetaList,
  DirectoryMap,
  BreadCrumbItem,
  BreadCrumbs,
  Group,
  GroupItem,
  SortMode,
  ColorScheme,
  ViewMode,
  transformTime,
  transformBytes,
  getFileTypeAndIcon,
  E,
  TE,
}

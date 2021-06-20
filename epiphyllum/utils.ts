interface FileMeta {
  isDir: boolean
  pathname: string
  time: number
  size: number
  transformedTime: string
  transformedSize: string
}

interface DirectoryMeta {
  pathname: string
  files: FileMeta[]
}

type FileMetaList = FileMeta[]

type DirectoryMap = Map<string, DirectoryMeta>

interface BreadCrumbItem {
  text: string
  disabled: boolean
  href: string
}

type BreadCrumbs = BreadCrumbItem[]

type sortMode = 'normal' | 'time-asc' | 'time-desc' | 'size-asc' | 'size-desc'

interface GroupItem {
  title: string
  mode: sortMode
  icon: string
}

interface Group {
  title: string
  prependIcon: string
  items: GroupItem[]
}

interface SortStatus {
  mode: sortMode
  icon:
    | 'sort'
    | 'calendar-ascending'
    | 'calendar-descending'
    | 'sort-ascending'
    | 'sort-descending'
}

/**
 * await帮助函数，帮助捕获异常
 * 由于只需要关心结果是否存在，err始终为string
 */
function awaitHelper<T>(promise: Promise<T>): Promise<[string, T | null]> {
  return promise
    .then<[string, T]>((res) => ['', res])
    .catch<[string, null]>((err) => [err, null])
}

function transformTime(time: number): string {
  const tranformedRawDate = new Date(time * 1000)
  const year = tranformedRawDate.getFullYear()
  const month = tranformedRawDate.getMonth() + 1
  const date = tranformedRawDate.getDate()
  const hour = tranformedRawDate.getHours()
  const minute = tranformedRawDate.getMinutes()

  function formatMinute(): string {
    if (minute < 10) {
      return '0' + minute
    } else {
      return minute.toString()
    }
  }

  return `${year}-${month}-${date} ${hour}:${formatMinute()}`
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
  SortStatus,
  transformTime,
  transformBytes,
  E,
  TE,
}

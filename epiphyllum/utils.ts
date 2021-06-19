interface FileMeta {
  isDir: boolean
  pathname: string
  files?: FileMeta[]
}

type Files = FileMeta[]

type DirectoryMap = Map<string, FileMeta>

/**
 * await帮助函数，帮助捕获异常
 * 由于只需要关心结果是否存在，err始终为string
 */
function awaitHelper<T>(promise: Promise<T>): Promise<[string, T | null]> {
  return promise
    .then<[string, T]>((res) => ['', res])
    .catch<[string, null]>((err) => [err, null])
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

export { awaitHelper, LiteLogger, FileMeta, Files, DirectoryMap, E, TE }

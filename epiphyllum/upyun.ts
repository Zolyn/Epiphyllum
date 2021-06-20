import { join } from 'path'
import {
  awaitHelper,
  DirectoryMap,
  E,
  FileMeta,
  FileMetaList,
  TE,
  transformBytes,
  transformTime,
} from './utils'
import { UpyunSdk } from '~/epiphyllum/types'

interface USSListFile {
  name: string
  type: 'N' | 'F'
  size: number
  time: number
}

interface USSListResult {
  files: USSListFile[]
  next: string
}

async function getUSSDirectoryTree({
  service: serviceName,
  operator,
  password,
}: UpyunSdk): Promise<DirectoryMap> {
  // @ts-ignore
  // 导入又拍云 node-sdk
  const [importErr, upyun] = await awaitHelper(import('upyun'))

  if (!upyun) {
    throw importErr
  }

  const service = new upyun.Service(serviceName, operator, password)

  const client = new upyun.Client(service)

  const directoryMap: DirectoryMap = new Map()

  async function getDirectoryMap(path: string): Promise<void> {
    const fileMetaList: FileMetaList = []
    const [err, currentFiles] = await awaitHelper<USSListResult | false>(
      client.listDir(path)
    )

    if (!currentFiles) {
      if (typeof currentFiles === 'boolean') {
        throw TE('No such file or directory.')
      }

      throw E(err)
    }

    for (const { type: fileType, name, time, size } of currentFiles.files) {
      console.log(size)
      console.log(time)
      const fileMeta: FileMeta = {
        isDir: false,
        pathname: name,
        time: transformTime(time),
        size: transformBytes(size),
      }

      if (fileType === 'F') {
        const fullPath = join(path, name)
        const [err] = await awaitHelper(getDirectoryMap(fullPath))

        if (err) {
          throw E(err)
        }

        fileMeta.isDir = true
      }

      fileMetaList.push(fileMeta)
    }

    directoryMap.set(path, {
      pathname: path,
      files: fileMetaList,
    })
  }

  await getDirectoryMap('/')
  return directoryMap
}

export { getUSSDirectoryTree }

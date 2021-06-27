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
  service,
  operator,
  password,
}: UpyunSdk): Promise<DirectoryMap> {
  // @ts-ignore
  // 导入又拍云 node-sdk
  const [importErr, upyun] = await awaitHelper(import('upyun'))

  const serviceName = service ?? process.env.UPYUN_SERVICE
  const operatorName = operator ?? process.env.UPYUN_OPERATOR
  const pass = password ?? process.env.UPYUN_PASSWORD

  if (!upyun) {
    throw importErr
  }

  const instance = new upyun.Service(serviceName, operatorName, pass)

  const client = new upyun.Client(instance)

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
      const fileMeta: FileMeta = {
        isDir: false,
        pathname: name,
        transformedTime: transformTime(time),
        transformedSize: transformBytes(size),
        time,
        size,
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

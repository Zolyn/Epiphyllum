import { join } from 'path'
import {
  awaitHelper,
  DirectoryMap,
  E,
  FileMeta,
  Files,
  LiteLogger as Logger,
  TE,
} from './utils'
import { UpyunSdk } from '~/epiphyllum/types'

interface USSListFile {
  name: string
  type: 'N' | 'F'
  size: BigInt
  time: BigInt
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

  // async function getDirectoryMap(path: string): Promise<void> {
  //   const files
  //   const [err, currentFiles] = await awaitHelper<USSListResult | false>(
  //     client.listDir(path)
  //   )
  //
  //   if (!currentFiles) {
  //     if (typeof currentFiles === 'boolean') {
  //       throw TE('No such file or directory.')
  //     }
  //
  //     throw E(err)
  //   }
  //
  //   for (const { type, name } of currentFiles.files) {
  //     if (type === 'N') {
  //
  //     } else {
  //       type
  //     }
  //   }
  // }


  async function getDirectoryTree(path: string): Promise<Files> {
    const result: Files = []
    const [err, currentFiles] = await awaitHelper<USSListResult | false>(
      client.listDir(path)
    )

    if (!currentFiles) {
      if (typeof currentFiles === 'boolean') {
        throw TE('No such file or directory.')
      }

      throw E(err)
    }

    for (const { type, name } of currentFiles.files) {
      switch (type) {
        case 'N': {
          result.push({
            isDir: false,
            pathname: name,
          })

          break
        }

        case 'F': {
          const fullPath = join(path, name)
          Logger.info(fullPath)
          const [err, files] = await awaitHelper(getDirectoryTree(fullPath))

          if (!files) {
            throw E(err)
          }

          const directory: FileMeta = {
            isDir: true,
            pathname: name,
            files,
          }

          result.push(directory)
          directoryMap.set(fullPath, directory)

          break
        }
      }
    }

    return result
  }

  const [treeErr, dirTree] = await awaitHelper(getDirectoryTree('/'))

  if (!dirTree) {
    throw E(treeErr)
  }

  const USSDirTree: FileMeta = {
    isDir: true,
    pathname: '/',
    files: dirTree,
  }

  directoryMap.set('/', USSDirTree)

  return directoryMap
}

export { getUSSDirectoryTree }

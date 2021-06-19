import { awaitHelper, E, DirectoryMap } from './utils'
import { getUSSDirectoryTree } from '~/epiphyllum/upyun'

async function main(): Promise<DirectoryMap> {
  const [importErr, module] = await awaitHelper(import('../epiphyllum.config'))

  if (!module) {
    throw E(importErr)
  }

  const config = module.default

  let result: DirectoryMap | null
  let treeError: string = 'Unknown error'

  switch (config.storage) {
    case 'upyun': {
      ;[treeError, result] = await awaitHelper(
        getUSSDirectoryTree(config.apiConfig)
      )
    }
  }

  if (!result) {
    throw E(treeError)
  }

  return result
}

export { main as EpiphyllumEntry }
